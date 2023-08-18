import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

import type {
  GetSponsoredProductsRequest,
  GetSponsoredProductsResponse,
} from '../typings/AdServer'

class AdServer extends ExternalClient {
  // TODO: update this URL when the Ad Server is in production
  public static BASE_URL = 'http://localhost:8080'

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
