export type AdServerRequest = {
  accountName?: string
  count: number
  searchParams: AdServerSearchParams
  userId?: string
}

export type AdServerResponse = {
  adRequestId: string
  adResponseId: string
  sponsoredProducts: AdServerSponsoredProduct[]
}

export type AdServerSearchParams = Pick<SearchParams, AdServerSearchParamsKeys>

type AdServerSearchParamsKeys =
  | 'query'
  | 'regionId'
  | 'operator'
  | 'fuzzy'
  | 'searchState'
  | 'selectedFacets'

type AdServerSponsoredProduct = {
  campaignId: string
  adId: string
  productId: string
  actionCost: number
  options?: Options
}

type Options = {
  hideSponsoredBadge?: boolean
}
