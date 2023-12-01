import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

import type { AdServerRequest, AdServerResponse } from '../typings/AdServer'

class AdServer extends ExternalClient {
  public static BASE_URL = 'https://ad-server.vtex.systems'

  constructor(ctx: IOContext, options?: InstanceOptions) {
    super(AdServer.BASE_URL, ctx, { ...options })
  }

  public getSponsoredProducts(
    _body: AdServerRequest
  ): Promise<AdServerResponse> {
    const response: AdServerResponse = {
      adRequestId: '123',
      adResponseId: '321',
      sponsoredProducts: [
        {
          productId: '33232',
          actionCost: 0.5,
          campaignId: '321',
          adId: '123',
        },
        // {
        //   productId: '2',
        //   actionCost: 0.5,
        //   campaignId: '321',
        //   adId: '321',
        // },
        // {
        //   productId: '48103',
        //   actionCost: 0.5,
        //   campaignId: '321',
        //   adId: '123',
        // },
        // {
        //   productId: '98698',
        //   actionCost: 0.5,
        //   campaignId: '321',
        //   adId: '321',
        // },
        // {
        //   productId: '44308',
        //   actionCost: 0.5,
        //   campaignId: '321',
        //   adId: '456',
        // },
        // {
        //   productId: '61312',
        //   actionCost: 0.5,
        //   campaignId: '321',
        //   adId: '654',
        // },
        // {
        //   productId: '51455',
        //   actionCost: 0.5,
        //   campaignId: '321',
        //   adId: '789',
        // },
        // {
        //   productId: '59369',
        //   actionCost: 0.5,
        //   campaignId: '321',
        //   adId: '987',
        // },
      ],
    }

    return Promise.resolve(response)

    // return this.http.post('/api/v1/sponsored-products', {
    //   accountName: this.context.account,
    //   ...body,
    // })
  }
}

export default AdServer
