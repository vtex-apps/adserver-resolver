import AdServer from '../clients/AdServer'
import type { AdServerSponsoredBannersResponse } from '../typings/AdServer'

const AD_TYPE = 'banner'
const SPONSORED_COUNT = 1

const mapSponsoredBanner = (
  adResponse: AdServerSponsoredBannersResponse
): SponsoredBanner[] => {
  if (!adResponse?.items) return []

  return adResponse.items?.map(
    ({ bannerImageId, imageUrl, targetUrl, width, height }) => {
      const advertisement = {
        bannerImageId,
        imageUrl,
        targetUrl,
        width,
        height,
      }

      return {
        adResponseId: adResponse?.adResponseId,
        advertisement,
      }
    }
  )
}

export async function sponsoredBanners(
  _: unknown,
  args: SponsoredBannersParams,
  ctx: Context
): Promise<SponsoredBanner[]> {
  try {
    const adResponse = await ctx.clients.adServer.getSponsoredBanners({
      adType: AD_TYPE,
      count: SPONSORED_COUNT,
      userId: args.anonymousId,
      placement: args.placement,
      adUnit: args.adUnit,
      channel: args.channel,
    })

    return mapSponsoredBanner(adResponse)
  } catch (error) {
    if (error.response?.data === AdServer.ERROR_MESSAGES.AD_NOT_FOUND) return []

    throw error
  }
}
