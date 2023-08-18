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

  describe('when the shopper is sorting products by relevance', () => {
    const expectedResponse = getSponsoredProductsResponse.sponsoredProducts.map(
      ({ productId }) => ({ productId, rule: { id: 'sponsoredProduct' } })
    )

    it('queries the Ad Server and returns the sponsored products', async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = await query({}, defaultVariables, mockContext as any)

      expect(getSponsoredProductsSpy).toHaveBeenCalledWith({
        count: 2,
        searchParams: { query: 'shoes' },
      })
      expect(result).toMatchObject(expectedResponse)
    })
  })

  describe('when the shopper is sorting products by something other than relevance', () => {
    const variables = {
      ...defaultVariables,
      sort: 'OrderByTopSaleDESC',
    }

    it('returns an empty list', async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = await query({}, variables, mockContext as any)

      expect(result).toHaveLength(0)
    })
  })
})
