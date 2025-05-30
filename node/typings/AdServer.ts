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
  adUnit: string
  channel?: string
  placement: string
  userId?: string
}

export type AdServerSponsoredBannersResponse = {
  adResponseId: string
  banners: AdServerSponsoredBanner[]
}

type AdServerSponsoredBanner = {
  imageUrl: string
  targetUrl: string
  bannerImageId: string
  width: number
  height: number
}
