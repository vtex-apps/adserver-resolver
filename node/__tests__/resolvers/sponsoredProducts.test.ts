import AdServer from '../../clients/AdServer'
import { resolvers } from '../../resolvers'
import { getSponsoredProductsResponse } from '../__utils__/mocks/adServer'

const getSponsoredProductsSpy = jest.fn()

const defaultContext = {
  vtex: { logger: { error: jest.fn() } },
  clients: {
    adServer: { getSponsoredProducts: getSponsoredProductsSpy },
    apps: {
      getAppSettings: jest
        .fn()
        .mockResolvedValue({ enableAdsOnCollections: true }),
    },
  },
}

const sponsoredCount = 4

const defaultVariables = {
  query: 'shoes',
  sort: '',
  anonymousId: 'anonymousId',
  sponsoredCount,
}

describe('query sponsoredProducts', () => {
  const query = resolvers.Query.sponsoredProducts

  beforeEach(() => {
    getSponsoredProductsSpy.mockResolvedValue(getSponsoredProductsResponse)
  })

  describe('when the shopper is sorting products by relevance', () => {
    describe('and the ad server returns sponsored products', () => {
      const expectedResponse =
        getSponsoredProductsResponse.sponsoredProducts.map(
          ({ productId, campaignId, adId, actionCost, options }) => ({
            productId,
            identifier: {
              field: 'product',
              value: productId,
            },
            rule: { id: 'sponsoredProduct' },
            advertisement: {
              campaignId,
              adId,
              actionCost,
              adRequestId: getSponsoredProductsResponse.adRequestId,
              adResponseId: getSponsoredProductsResponse.adResponseId,
              options,
            },
          })
        )

      it('queries the Ad Server and returns the ad response', async () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result = await query({}, defaultVariables, defaultContext as any)

        expect(getSponsoredProductsSpy).toHaveBeenCalledWith({
          count: sponsoredCount,
          searchParams: {
            query: 'shoes',
            selectedFacets: [],
          },
          userId: 'anonymousId',
        })
        expect(result).toMatchObject(expectedResponse)
      })
    })

    describe('and the ad server returns a "Ad Not Found" error', () => {
      beforeEach(() => {
        getSponsoredProductsSpy.mockRejectedValue({
          response: { data: AdServer.ERROR_MESSAGES.AD_NOT_FOUND },
        })
      })

      it('queries returns an empty list', async () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result = await query({}, defaultVariables, defaultContext as any)

        expect(result).toMatchObject([])
      })
    })

    describe('and the shopper is requesting a product collection', () => {
      const selectedFacets = [
        { key: 'productClusterIds', value: 'collectionId' },
      ]

      const variables = {
        ...defaultVariables,
        selectedFacets,
        map: 'productClusterIds',
      }

      beforeEach(() => {
        getSponsoredProductsSpy.mockResolvedValue(getSponsoredProductsResponse)
      })

      it('returns the ad response', async () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result = await query({}, variables, defaultContext as any)

        expect(result[0].advertisement?.adId).toBe(
          getSponsoredProductsResponse.sponsoredProducts[0].adId
        )
      })

      describe('and the store has disabled sponsored products on collections', () => {
        const context = {
          ...defaultContext,
          clients: {
            ...defaultContext.clients,
            apps: {
              getAppSettings: jest
                .fn()
                .mockResolvedValue({ enableAdsOnCollections: false }),
            },
          },
        }

        it('returns an empty list as sponsored products', async () => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const result = await query({}, variables, context as any)

          expect(result).toMatchObject([])
        })
      })
    })
  })

  describe('when the shopper is sorting products by something other than relevance', () => {
    const expectedResponse: SponsoredProduct[] = []

    const variables = {
      ...defaultVariables,
      sort: 'OrderByTopSaleDESC',
    }

    it('returns an empty list as sponsored products', async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = await query({}, variables, defaultContext as any)

      expect(result).toMatchObject(expectedResponse)
    })
  })
})
