const RELEVANCE_DESC_SORT_STR = 'orderbyscoredesc'
const PRODUCT_CLUSTER_MAP = 'productClusterIds'

const isSortedByRelevance = (args: SearchParams) => {
  return !args.sort || args.sort?.toLowerCase() === RELEVANCE_DESC_SORT_STR
}

const queryHasProductClusters = (args: SearchParams) => {
  const mapHasProductClusters = args.map === PRODUCT_CLUSTER_MAP
  const facetsHaveProductClusters = args.selectedFacets?.some(
    (facet) => facet.key === PRODUCT_CLUSTER_MAP
  )

  return mapHasProductClusters || facetsHaveProductClusters
}

const shouldFetchOnProductClusers = async (ctx: Context) => {
  const settings = await ctx.clients.apps.getAppSettings(
    'vtex.adserver-resolver'
  )

  return settings?.enableAdsOnCollections ?? true
}

/**
 * Determine whether or not to fetch sponsored products based on a few parameters:
 * 1. If the search is not sorted by relevance, don't fetch.
 * 2. If the search is not for a product cluster (collections), fetch.
 * 3. If the search is for a product cluster, fetch if the feature is enabled.
 */
export const shouldFetchSponsoredProducts = async (
  args: SearchParams,
  ctx: Context
) => {
  if (!isSortedByRelevance(args)) return false
  if (!queryHasProductClusters(args)) return true

  return shouldFetchOnProductClusers(ctx)
}
