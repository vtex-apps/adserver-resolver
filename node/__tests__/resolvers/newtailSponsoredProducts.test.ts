import { newtailSponsoredProducts } from '../../resolvers/sponsoredProducts/newtail'
import type { NewtailResponse } from '../../typings/Newtail'

// Mock OpenTelemetry dependencies
jest.mock('@vtex/diagnostics-nodejs', () => ({}))

const getSponsoredProductsSpy = jest.fn()
const getNewtailPublisherIdSpy = jest.fn()
const getAppSettingsSpy = jest.fn()

const mockNewtailResponse: NewtailResponse = {
  query_at: '2026-02-23T12:00:00Z',
  query_id: 'query-123',
  request_id: 'request-456',
  validations: undefined,
  ads_newtail: [
    {
      ad_id: 'ad-1',
      click_url: 'https://example.com/click',
      impression_url: 'https://example.com/impression',
      view_url: 'https://example.com/view',
      position: 1,
      product_sku: 'sku-123',
      seller_id: 'seller-1',
      type: 'product',
      product_metadata: {
        productId: 'product-123',
      },
    },
  ],
}

const defaultContext = {
  vtex: {
    logger: {
      error: jest.fn(),
      warn: jest.fn(),
    },
  },
  clients: {
    newtail: {
      getSponsoredProducts: getSponsoredProductsSpy,
    },
    apps: {
      getAppSettings: getAppSettingsSpy,
    },
  },
}

jest.mock('../../utils/getNewtailPublisherID', () => ({
  getNewtailPublisherId: () => getNewtailPublisherIdSpy(),
}))

jest.mock('../../utils/shouldFetchSponsoredProducts', () => ({
  shouldFetchSponsoredProducts: jest.fn().mockResolvedValue(true),
}))

describe('newtailSponsoredProducts - placement definition', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    getSponsoredProductsSpy.mockResolvedValue(mockNewtailResponse)
    getNewtailPublisherIdSpy.mockResolvedValue('publisher-123')
    getAppSettingsSpy.mockResolvedValue({ enableAdsOnCollections: true })
  })

  describe('when placement is null', () => {
    const args = {
      query: '',
      sponsoredCount: 6,
      placement: null,
      userId: 'user-123',
      macId: 'f6b0c284-bd5c-4ba2-b474-606722f2a15f',
      selectedFacets: [{ key: 'productClusterIds', value: '1011' }],
      skuId: undefined,
    }

    it('should use "ads_newtail" as placement key instead of "null"', async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await newtailSponsoredProducts({}, args, defaultContext as any)

      const callArgs = getSponsoredProductsSpy.mock.calls[0][0]
      
      // Should have "ads_newtail" key, not "null"
      expect(callArgs.placements).toHaveProperty('ads_newtail')
      expect(callArgs.placements).not.toHaveProperty('null')
      
      expect(callArgs.placements.ads_newtail).toEqual({
        quantity: 6,
        types: ['product'],
      })
    })
  })

  describe('when placement is undefined', () => {
    const args = {
      query: '',
      sponsoredCount: 3,
      placement: undefined,
      userId: 'user-123',
      macId: 'session-id',
      selectedFacets: [],
      skuId: undefined,
    }

    it('should use "ads_newtail" as placement key', async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await newtailSponsoredProducts({}, args, defaultContext as any)

      const callArgs = getSponsoredProductsSpy.mock.calls[0][0]
      
      expect(callArgs.placements).toHaveProperty('ads_newtail')
      expect(callArgs.placements.ads_newtail).toEqual({
        quantity: 3,
        types: ['product'],
      })
    })
  })

  describe('when custom placement is provided', () => {
    const args = {
      query: '',
      sponsoredCount: 5,
      placement: 'custom_placement',
      userId: 'user-123',
      macId: 'session-id',
      selectedFacets: [],
      skuId: undefined,
    }

    it('should use the provided placement name', async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await newtailSponsoredProducts({}, args, defaultContext as any)

      const callArgs = getSponsoredProductsSpy.mock.calls[0][0]
      
      expect(callArgs.placements).toHaveProperty('custom_placement')
      expect(callArgs.placements.custom_placement).toEqual({
        quantity: 5,
        types: ['product'],
      })
    })
  })
})
