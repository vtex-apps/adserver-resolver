import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

import type { NewtailRequest, NewtailResponse } from '../typings/Newtail'

const NEWTAIL_PUBLISHERS_ID: { [key: string]: string } = {
  americanasqa: '1da8ef01-58c8-48bc-9086-038fcb3aeeb3',
  biggy: '1da8ef01-58c8-48bc-9086-038fcb3aeeb3',
  americanas: '4d600792-e73a-4e3f-b7b1-0447b8c4bb94',
  fastshopbr: '974b02b9-bfda-4a7c-ac10-2bd5b1d29a37',
  paguemenos: '47e240a0-61f7-46fd-8056-81288de6d724',
}

class Newtail extends ExternalClient {
  public static BASE_URL = 'https://newtail-media.newtail.com.br'

  public static ERROR_MESSAGES = {
    AD_NOT_FOUND: 'Ad not found',
  }

  constructor(ctx: IOContext, options?: InstanceOptions) {
    super(Newtail.BASE_URL, ctx, { ...options })
  }

  public async getSponsoredProducts(
    body: NewtailRequest
  ): Promise<NewtailResponse> {
    const newtailPublisherId = NEWTAIL_PUBLISHERS_ID[this.context.account]
    const endpoint = `/v1/rma/${newtailPublisherId}`

    // TODO: remove it after kobe fix
    if (this.context.account === 'americanas') {
      body.user_id = body.session_id
    }

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
