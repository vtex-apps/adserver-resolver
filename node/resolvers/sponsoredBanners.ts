import AdServer from '../clients/AdServer'
import type { AdServerSponsoredBannersResponse } from '../typings/AdServer'

const AD_TYPE = 'banner'
const SPONSORED_COUNT = 1

const mapSponsoredBanner = (
  adResponse: AdServerSponsoredBannersResponse
): SponsoredBanner[] => {
  if (!adResponse?.sponsoredBanners) return []

  return adResponse.sponsoredBanners?.map(
    ({ actionCost, bannerId, campaignId, imageUrl, targetUrl }) => {
      const advertisement = {
        imageUrl,
        targetUrl,
        campaignId,
        actionCost,
        adRequestId: adResponse?.adRequestId,
        adResponseId: adResponse?.adResponseId,
      }

      return {
        bannerId,
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
