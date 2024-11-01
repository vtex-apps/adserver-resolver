import type { ServiceContext } from '@vtex/api'
import type { Clients } from '../clients'

declare global {
  type Context = ServiceContext<Clients>

  type SelectedFacet = {
    key: string
    value: string
  }

  type Options = {
    allowRedirect: boolean
  }

  type Operator = 'AND' | 'OR'

  type BoostAction = 'add' | 'remove' | 'promote' | 'demote'

  type BoostType =
    | 'term'
    | 'id'
    | 'skuId'
    | 'skuEan'
    | 'skuReference'
    | 'productLink'
    | 'product'
    | 'sku'
    | 'productId'
    | 'attribute'

  type DynamicRule = {
    action: BoostAction
    type: BoostType
    value: string
  }

  type SponsoredProductsParams = SearchParams & {
    placement?: string
    sponsoredCount?: number
  }

  type SearchParams = {
    query?: string
    page?: string
    count?: string
    sort?: string
    operator?: string
    map?: string
    fuzzy?: string
    locale?: string
    allowRedirect?: boolean
    regionId?: string
    simulationBehavior?: 'skip' | 'only1P' | 'default' | null
    hideUnavailableItems?: boolean | null
    productOriginVtex?: string
    selectedFacets?: SelectedFacet[]
    dynamicRules?: DynamicRule[]
    searchState?: string
    customPluginInfo?: string
    anonymousId?: string
  }

  type SponsoredProduct = {
    productId: string
    identifier: ProductUniqueIdentifier
    rule: Rule
    advertisement?: Advertisement
  }

  type ProductUniqueIdentifier = {
    field: ProductUniqueIdentifierField
    value: string
  }

  type ProductUniqueIdentifierField = 'anuId' | 'skuId' | 'product'

  type Rule = {
    id: string
  }

  type Advertisement = {
    campaignId: string
    adId: string
    actionCost: number
    adRequestId: string
    adResponseId: string
    options?: AdvertisementOptions
  }

  type AdvertisementOptions = {
    hideSponsoredBadge?: boolean
  }

  type Placement =
    | 'top_search'
    | 'middle_search'
    | 'home_shelfpdp_shelf'
    | 'search_shelf'
    | 'cart_shelf'
    | 'plp_shelf'
    | 'autocomplete'
    | 'homepage'

  type AdUnit =
    | 'billboard'
    | 'smartphonebanner'
    | 'leaderboard'
    | 'superleaderboard'
    | 'portrait'
    | 'skyscraper'
    | 'mediumrectangle'
    | 'button120x60'
    | 'mobilephoneinterstitial'
    | 'featurephonesmallbanner'
    | 'featurephonemediumbanner'
    | 'featurephonelargebanner'

  type Channel = 'website' | 'android' | 'ios' | 'msite' | 'whatsapp'

  type SponsoredBannersParams = {
    sponsoredCount: number
    placement: Placement
    adUnit: AdUnit
    channel?: Channel
    anonymousId?: string
  }

  type SponsoredBanner = {
    adResponseId: string
    advertisement: AdvertisementBanner
  }

  type AdvertisementBanner = {
    bannerImageId: string
    imageUrl: string
    targetUrl: string
    width: number
    height: number
  }
}
