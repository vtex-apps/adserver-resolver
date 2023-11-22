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
}

const defaultVariables = {
  query: 'shoes',
  sort: '',
}

describe('query sponsoredProducts', () => {
  const query = resolvers.Query.sponsoredProducts

  const expectedResponse = getSponsoredProductsResponse.sponsoredProducts.map(
    ({ productId, campaignId, adId, actionCost }) => ({
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
      },
    })
  )

  it('queries the Ad Server and returns the ad response', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await query({}, defaultVariables, mockContext as any)

    expect(getSponsoredProductsSpy).toHaveBeenCalledWith({
      count: 2,
      searchParams: { query: 'shoes' },
    })
    expect(result).toMatchObject(expectedResponse)
  })
})
