export type AdServerRequest = {
  accountName?: string
  count: number
  searchParams: AdServerSearchParams
  userId?: string
  placement?: string
}

export type AdServerResponse = {
  adRequestId: string
  adResponseId: string
  sponsoredProducts: AdServerSponsoredProduct[]
}

export type AdServerSearchParams = Pick<SearchParams, AdServerSearchParamsKeys>

type AdServerSearchParamsKeys = 'query' | 'selectedFacets'

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

export type AdServerSponsoredBannersRequest = {
  accountName?: string
  count: number
  adType: 'banner'
  adUnit: string
  channel: string
  placement: string
  userId: string
}

export type AdServerSponsoredBannersResponse = {
  adRequestId: string
  adResponseId: string
  items: AdServerSponsoredBanner[]
}

type AdServerSponsoredBanner = {
  bannerId: string
  targetUrl: string
  imageUrl: string
  campaignId: string
  actionCost: number
}
