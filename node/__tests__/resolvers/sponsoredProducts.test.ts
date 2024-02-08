import AdServer from '../../clients/AdServer'
import { resolvers } from '../../resolvers'
import { getSponsoredProductsResponse } from '../__utils__/mocks/adServer'

const getSponsoredProductsSpy = jest
  .fn()
  .mockImplementation(() => getSponsoredProductsResponse)

const mockContext = {
  clients: {
    adServer: {
      getSponsoredProducts: getSponsoredProductsSpy,
    },
  },
  vtex: {
    logger: {
      error: jest.fn(),
    },
  },
}

const defaultVariables = {
  query: 'shoes',
  sort: '',
  anonymousId: 'anonymousId',
}

describe('query sponsoredProducts', () => {
  const query = resolvers.Query.sponsoredProducts

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
        const result = await query({}, defaultVariables, mockContext as any)

        expect(getSponsoredProductsSpy).toHaveBeenCalledWith({
          count: 2,
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
        const result = await query({}, defaultVariables, mockContext as any)

        expect(result).toMatchObject([])
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
      const result = await query({}, variables, mockContext as any)

      expect(result).toMatchObject(expectedResponse)
    })
  })
})
