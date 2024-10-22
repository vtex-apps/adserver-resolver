import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

import type {
  AdServerRequest,
  AdServerResponse,
  AdServerSponsoredBannersRequest,
  AdServerSponsoredBannersResponse,
} from '../typings/AdServer'

class AdServer extends ExternalClient {
  public static BASE_URL = 'https://ad-server.vtex.systems'

  public static ERROR_MESSAGES = {
    AD_NOT_FOUND: 'Ad not found',
  }

  constructor(ctx: IOContext, options?: InstanceOptions) {
    super(AdServer.BASE_URL, ctx, { ...options })
  }

  public getSponsoredProducts(
    body: AdServerRequest
  ): Promise<AdServerResponse> {
    if (process.env.VTEX_APP_LINK) {
      // eslint-disable-next-line no-console
      console.log(JSON.stringify(body, null, 2))
    }

    return this.http.post('/api/v1/sponsored-products', {
      accountName: this.context.account,
      ...body,
    })
  }

  public getSponsoredBanners(
    body: AdServerSponsoredBannersRequest
  ): Promise<AdServerSponsoredBannersResponse> {
    if (process.env.VTEX_APP_LINK) {
      // eslint-disable-next-line no-console
      console.log(JSON.stringify(body, null, 2))
    }

    return this.http.post('/api/v1/ads/banner', {
      accountName: this.context.account,
      ...body,
    })
  }
}

export default AdServer
