import AdServer from '../clients/AdServer'
import type {
  AdServerResponse,
  AdServerSearchParams,
} from '../typings/AdServer'
import compact from '../utils/compact'

const RULE_ID = 'sponsoredProduct'
const PRODUCT_UNIQUE_IDENTIFIER_FIELD = 'product'
const SPONSORED_PRODUCTS_COUNT = 2
const RELEVANCE_DESC_SORT_STR = 'orderbyscoredesc'

// Only show sponsored products in the default sort (Relevance).
const showSponsoredProducts = (args: SearchParams) => {
  return !args.sort || args.sort?.toLowerCase() === RELEVANCE_DESC_SORT_STR
}

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
    ({ productId, campaignId, adId, actionCost, options }) => {
      const advertisement = {
        campaignId,
        adId,
        actionCost,
        adRequestId: adResponse?.adRequestId,
        adResponseId: adResponse?.adResponseId,
        options,
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
  if (!showSponsoredProducts(args)) return []

  try {
    const adResponse = await ctx.clients.adServer.getSponsoredProducts({
      count: SPONSORED_PRODUCTS_COUNT,
      searchParams: getSearchParams(args),
      userId: args.anonymousId,
    })

    return mapSponsoredProduct(adResponse)
  } catch (error) {
    if (error.response?.data === AdServer.ERROR_MESSAGES.AD_NOT_FOUND) return []

    throw error
  }
}
