import type { AdServerSearchParams } from '../typings/AdServer'
import compact from '../utils/compact'

const RULE_ID = 'sponsoredProduct'
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

export async function sponsoredProducts(
  _: unknown,
  args: SearchParams,
  ctx: Context
): Promise<SponsoredProduct[]> {
  if (!showSponsoredProducts(args)) return []

  const adResponse = await ctx.clients.adServer.getSponsoredProducts({
    count: SPONSORED_PRODUCTS_COUNT,
    searchParams: getSearchParams(args),
  })

  return adResponse.sponsoredProducts.map(({ productId }) => ({
    productId,
    rule: { id: RULE_ID },
  }))
}
