import type { GetSponsoredProductsResponse } from '../../../typings/AdServer'

export const getSponsoredProductsResponse: GetSponsoredProductsResponse = {
  adRequestId: 'adRequestId',
  adResponseId: 'adResponseId',
  sponsoredProducts: [
    {
      productId: 'productId',
      campaignId: 'campaignId',
      adId: 'adId',
      actionCost: 0.32,
    },
  ],
}
