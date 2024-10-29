import AdServer from '../../clients/AdServer'
import { resolvers } from '../../resolvers'
import { getSponsoredBannersResponse } from '../__utils__/mocks/adServer'

const getSponsoredBannersSpy = jest.fn()

const defaultContext = {
  vtex: { logger: { error: jest.fn() } },
  clients: {
    adServer: { getSponsoredBanners: getSponsoredBannersSpy },
    apps: {
      getAppSettings: jest
        .fn()
        .mockResolvedValue({ enableAdsOnCollections: true }),
    },
  },
}

const defaultVariables = {
  anonymousId: 'anonymousId',
  placement: 'homepage',
  adUnit: 'billboard',
  channel: 'website',
}

describe('query sponsoredBanners', () => {
  const query = resolvers.Query.sponsoredBanners

  beforeEach(() => {
    getSponsoredBannersSpy.mockResolvedValue(getSponsoredBannersResponse)
  })

  describe('when the ad server returns sponsored banners', () => {
    it('queries the Ad Server and returns the ad response', async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = await query({}, defaultVariables, defaultContext as any)

      expect(getSponsoredBannersSpy).toHaveBeenCalledWith({
        adType: 'banner',
        count: 1,
        userId: 'anonymousId',
        placement: 'homepage',
        adUnit: 'billboard',
        channel: 'website',
      })

      expect(result).toMatchObject([
        {
          adResponseId: 'adResponseBannerId',
          advertisement: {
            bannerImageId: 'bannerImageId',
            height: 250,
            imageUrl: 'https://example.com/banner.jpg',
            targetUrl: 'https://example.com',
            width: 970,
          },
        },
      ])
    })

    describe('when the ad server returns a "Ad Not Found" error', () => {
      beforeEach(() => {
        getSponsoredBannersSpy.mockRejectedValue({
          response: { data: AdServer.ERROR_MESSAGES.AD_NOT_FOUND },
        })
      })

      it('queries returns an empty list', async () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result = await query({}, defaultVariables, defaultContext as any)

        expect(result).toMatchObject([])
      })
    })
  })
})
