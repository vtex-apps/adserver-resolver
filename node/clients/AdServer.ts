import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

import type {
  GetSponsoredProductsRequest,
  GetSponsoredProductsResponse,
} from '../typings/AdServer'

class AdServer extends ExternalClient {
  public static BASE_URL = 'https://ad-server.vtex.systems'

  constructor(ctx: IOContext, options?: InstanceOptions) {
    super(AdServer.BASE_URL, ctx, { ...options })
  }

  public getSponsoredProducts(
    body: GetSponsoredProductsRequest
  ): Promise<GetSponsoredProductsResponse> {
    return this.http.post('/api/v1/sponsored-products', {
      accountName: this.context.account,
      ...body,
    })
  }
}

export default AdServer
