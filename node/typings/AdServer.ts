export type AdServerRequest = {
  accountName?: string
  count: number
  searchParams: AdServerSearchParams
}

export type AdServerResponse = {
  adRequestId: string
  adResponseId: string
  sponsoredProducts: SponsoredProduct[]
}

export type AdServerSearchParams = Pick<SearchParams, AdServerSearchParamsKeys>

type AdServerSearchParamsKeys =
  | 'query'
  | 'regionId'
  | 'operator'
  | 'fuzzy'
  | 'searchState'
  | 'selectedFacets'

type SponsoredProduct = {
  campaignId: string
  adId: string
  productId: string
  actionCost: number
}
