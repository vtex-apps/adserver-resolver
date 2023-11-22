import type {
  AdServerResponse,
  AdServerSearchParams,
} from '../typings/AdServer'
import compact from '../utils/compact'

const RULE_ID = 'sponsoredProduct'
const PRODUCT_UNIQUE_IDENTIFIER_FIELD = 'product'
const SPONSORED_PRODUCTS_COUNT = 2

const getSearchParams = (args: SearchParams): AdServerSearchParams => {
  const adServerSearchParams = {
    query: args.query,
    selectedFacets: args.selectedFacets,
    regionId: args.regionId,
    operator: args.operator,
    fuzzy: args.fuzzy,
    searchState: args.searchState,
  }

  return compact(adServerSearchParams)
}

const mapSponsoredProduct = (
  adResponse: AdServerResponse
): SponsoredProduct[] => {
  if (!adResponse?.sponsoredProducts) return []

  return adResponse.sponsoredProducts?.map(
    ({ productId, campaignId, adId, actionCost }) => {
      const advertisement = {
        campaignId,
        adId,
        actionCost,
        adRequestId: adResponse?.adRequestId,
        adResponseId: adResponse?.adResponseId,
      }

      return {
        productId,
        identifier: {
          field: PRODUCT_UNIQUE_IDENTIFIER_FIELD,
          value: productId,
        },
        rule: { id: RULE_ID },
        advertisement,
      }
    }
  )
}

export async function sponsoredProducts(
  _: unknown,
  args: SearchParams,
  ctx: Context
): Promise<SponsoredProduct[]> {
  const adResponse = await ctx.clients.adServer.getSponsoredProducts({
    count: SPONSORED_PRODUCTS_COUNT,
    searchParams: getSearchParams(args),
  })

  return mapSponsoredProduct(adResponse)
}
