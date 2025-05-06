interface SegmentData {
  campaigns?: any
  channel: number
  priceTables?: any
  utm_campaign: string
  regionId?: string
  utm_source: string
  utmi_campaign: string
  currencyCode: string
  currencySymbol: string
  countryCode: string
  cultureInfo: string
  [key: string]: any
}

interface ElasticImage {
  name: string
  value: string
}

enum IndexingType {
  API = 'API',
  XML = 'XML',
}

interface SearchResultArgs extends AdvertisementOptions {
  attributePath?: string
  query?: string
  page?: number
  count?: number
  sort?: string
  operator?: string
  fuzzy?: string
  leap?: boolean
  tradePolicy?: number
  segment?: SegmentData
  indexingType?: IndexingType
  searchState?: string
  sellers?: RegionSeller[]
  hideUnavailableItems?: boolean | null
  removeHiddenFacets?: boolean | null
  options?: Options
  initialAttributes?: string
  workspaceSearchParams?: object
  regionId?: string | null
  from?: number | null
  to?: number | null
  showSponsored?: boolean
}

interface BannersArgs {
  fullText: string
  attributePath: string
}

interface RegionSeller {
  id: string
  name: string
}

interface SuggestionProductsArgs {
  fullText: string
  facetKey?: string
  facetValue?: string
  salesChannel?: number
  segment?: SegmentData
  indexingType?: IndexingType
  productOriginVtex: boolean
  simulationBehavior: 'skip' | 'default' | 'only1P' | null
  hideUnavailableItems?: boolean | null
  regionId?: string
  workspaceSearchParams?: object
  segmentedFacets?: SelectedFacet[]
  orderBy?: string
  count?: number
  shippingOptions?: string[]
  advertisementOptions: AdvertisementOptions
}

interface SuggestionSearchesArgs {
  term: string
}

interface FacetsInput {
  map: string
  selectedFacets: SelectedFacet[]
  fullText: string
  query: string
  searchState?: string
  removeHiddenFacets: boolean
  hideUnavailableItems: boolean
  initialAttributes?: string
  categoryTreeBehavior: 'default' | 'show' | 'hide'
}

interface BiggyProductExtraData {
  key: string
  value: string
}
