export type GetSponsoredProductsRequest = {
  accountName?: string
  count: number
  searchParams: AdServerSearchParams
}

export type GetSponsoredProductsResponse = {
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
