import type { AdServerResponse } from '../../../typings/AdServer'

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
