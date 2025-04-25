export type NewtailRequest = {
  term?: string
  context?: 'search' | 'home' | 'category' | 'brand_page',
  category_name?: string,
  placements?: { [key: string]: NewtailPlacement }
  user_id?: string
  session_id?: string
  tags?: string[]
  product_sku?: string
  brand_name?: string
}

export type NewtailPlacement = {
  quantity: number
  types: string[]
}

export interface NewtailResponse {
  query_at: string
  query_id: string
  request_id: string
  validations: any[] | undefined
  [key: string]: PlacementResponse[] | string | undefined
}

export type NewtailSearchParams = Pick<SearchParams, NewtailSearchParamsKeys>

type NewtailSearchParamsKeys = 'query' | 'selectedFacets'

export type PlacementResponse = {
  ad_id: string

  click_url: string
  impression_url: string
  view_url: string
  position: number

  product_sku: string
  seller_id?: string
  type: string

  product_metadata: ProductMetadata
}

export type ProductMetadata = {
  productId: string
}
