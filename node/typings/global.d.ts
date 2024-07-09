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
}
