import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

import type { AdServerRequest, AdServerResponse } from '../typings/AdServer'

const accountToId: Record<string, string> = {
  extrafarmav2: '53793',
  storecomponents: '14',
}

class AdServer extends ExternalClient {
  public static BASE_URL = 'https://ad-server.vtex.systems'

  constructor(ctx: IOContext, options?: InstanceOptions) {
    super(AdServer.BASE_URL, ctx, { ...options })
  }

  public getSponsoredProducts(
    body: AdServerRequest
  ): Promise<AdServerResponse> {
    const productId = accountToId[this.context.account]

    return Promise.resolve({
      adResponseId: '65daf770-e255-4ca1-b50e-5f24ee6a6d56',
      adRequestId: '07017094-3dfa-4bda-86b3-9f17550b289f',
      sponsoredProducts: [
        {
          productId,
          campaignId: '3add0f42-3b09-4506-b86f-3df802486b1c',
          adId: '77a33755-08cb-40ff-b5e3-992eddd0c6fb',
          actionCost: 0.32,
        },
      ],
    })

    return this.http.post('/api/v1/sponsored-products', {
      accountName: this.context.account,
      ...body,
    })
  }
}

export default AdServer
