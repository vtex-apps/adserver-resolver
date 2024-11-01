import AdServer from '../clients/AdServer'
import type { AdServerSponsoredBannersResponse } from '../typings/AdServer'

const mapAdServerResponseToSponsoredBanner = (
  adResponse: AdServerSponsoredBannersResponse
): SponsoredBanner[] => {
  if (!adResponse?.banners) {
    return []
  }

  return adResponse.banners?.map(
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
      count: args.sponsoredCount,
      userId: args.anonymousId,
      placement: args.placement,
      adUnit: args.adUnit,
      channel: args.channel,
    })

    return mapAdServerResponseToSponsoredBanner(adResponse)
  } catch (error) {
    if (error.response?.data === AdServer.ERROR_MESSAGES.AD_NOT_FOUND) {
      return []
    }

    throw error
  }
}
