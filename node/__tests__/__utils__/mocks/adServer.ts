import type {
  AdServerResponse,
  AdServerSponsoredBannersResponse,
} from '../../../typings/AdServer'

export const getSponsoredProductsResponse: AdServerResponse = {
  adRequestId: 'adRequestId',
  adResponseId: 'adResponseId',
  sponsoredProducts: [
    {
      productId: 'productId',
      campaignId: 'campaignId',
      adId: 'adId',
      actionCost: 0.32,
      options: {
        hideSponsoredBadge: true,
      },
    },
  ],
}

export const getSponsoredBannersResponse: AdServerSponsoredBannersResponse = {
  adResponseId: 'adResponseBannerId',
  banners: [
    {
      bannerImageId: 'bannerImageId',
      imageUrl: 'https://example.com/banner.jpg',
      targetUrl: 'https://example.com',
      width: 970,
      height: 250,
    },
  ],
}
