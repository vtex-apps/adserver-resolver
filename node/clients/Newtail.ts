import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

import type { NewtailRequest, NewtailResponse } from '../typings/Newtail'

class Newtail extends ExternalClient {
  public static BASE_URL = 'https://newtail-media.newtail.com.br'

  public static ERROR_MESSAGES = {
    AD_NOT_FOUND: 'Ad not found',
  }

  constructor(ctx: IOContext, options?: InstanceOptions) {
    super(Newtail.BASE_URL, ctx, { ...options })
  }

  public async getSponsoredProducts(
    body: NewtailRequest,
    newtailPublisherId: string
  ): Promise<NewtailResponse> {
    const endpoint = `/v1/rma/${newtailPublisherId}`

    return this.http
      .post<NewtailResponse>(endpoint, {
        ...body,
      })
      .then((response) => {
        if (response.validations && response.validations.length > 0) {
          throw new Error('Newtail validation error')
        }

        return response
      })
  }
}

export default Newtail
