import Newtail from '../../clients/Newtail'
import type {
  NewtailResponse,
  NewtailPlacement,
  PlacementResponse,
  NewtailRequest,
  AdContext,
} from '../../typings/Newtail'
import { BRAND_FACET_KEYS, PRODUCT_CLUSTER_MAP } from '../../utils/constants'
import { getNewtailPublisherId } from '../../utils/getNewtailPublisherID'
import { shouldFetchSponsoredProducts } from '../../utils/shouldFetchSponsoredProducts'
import { trim } from '../../utils/trim'

const RULE_ID = 'sponsoredProduct'
const PRODUCT_SKU_IDENTIFIER_FIELD = 'skuId'
const DEFAULT_SPONSORED_COUNT = 3
const DEFAULT_PLACEMENT_NAME = 'ads_newtail'
const DEFAULT_CAMPAIGN_ID = ''
const DEFAULT_SESSION_ID = 'VTEX_SESSION_ID'

const getPlacementList = (
  newtailResponse: NewtailResponse,
  placement: string
): PlacementResponse[] => {
  return (newtailResponse[placement] as PlacementResponse[]) ?? []
}

const encodeBase64 = (str: string): string => {
  return Buffer.from(str).toString('base64')
}

const removeTrackingParamsFromUrl = (eventUrl: string): string => {
  const url = new URL(eventUrl)
  const paramsToRemove = ['user_id', 'session_id', 'event_id']

  paramsToRemove.forEach((param) => {
    url.searchParams.delete(param)
  })

  return url.toString()
}

const mapSponsoredProduct = (
  newtailResponse: NewtailResponse,
  requestHadSessionId: boolean,
  placement = DEFAULT_PLACEMENT_NAME
): SponsoredProduct[] => {
  const placementList: PlacementResponse[] = getPlacementList(
    newtailResponse,
    placement
  )

  if (placementList.length === 0) return []

  return placementList?.map(
    ({ product_sku, impression_url, seller_id, product_metadata }) => {
      const advertisement = {
        campaignId: DEFAULT_CAMPAIGN_ID,
        adId: encodeBase64(
          requestHadSessionId
            ? impression_url
            : removeTrackingParamsFromUrl(impression_url)
        ),
        actionCost: 0.0,

        adRequestId: newtailResponse?.request_id,
        adResponseId: newtailResponse?.query_id,
      }

      return {
        productId: product_metadata.productId,
        identifier: {
          field: PRODUCT_SKU_IDENTIFIER_FIELD,
          value: product_sku,
        },
        rule: { id: RULE_ID },
        advertisement,
        sellerId: seller_id,
      }
    }
  )
}

const definePlacements = (
  quantity: number,
  placement = DEFAULT_PLACEMENT_NAME
): { [key: string]: NewtailPlacement } => {
  const placements: { [key: string]: NewtailPlacement } = {
    [placement]: {
      quantity,
      types: ['product'],
    },
  }

  return placements
}

const validateParams = (
  args: SponsoredProductsParams,
  ctx: Context
): boolean => {
  const {
    vtex: { logger },
  } = ctx

  if (args.macId) return true

  logger.warn('macId was not provided.')

  return false
}

export const SKU_ID_PREFIX = 'sku.id:'
export const getSkus = (query: string | undefined): string[] | undefined => {
  if (query?.startsWith(SKU_ID_PREFIX)) {
    return trim(query?.substring(SKU_ID_PREFIX.length), ';').split(';')
  }

  return undefined
}

export const getContext = (
  term: string | undefined,
  categoryName: string | undefined,
  brandName: string | undefined
): AdContext => {
  if (term) {
    return 'search'
  }

  if (categoryName) {
    return 'category'
  }

  if (brandName) {
    return 'brand_page'
  }

  return 'home'
}

export async function newtailSponsoredProducts(
  _: unknown,
  args: SponsoredProductsParams,
  ctx: Context
): Promise<SponsoredProduct[]> {
  const hasMacId = validateParams(args, ctx)

  const shouldFetch = await shouldFetchSponsoredProducts(args, ctx)

  if (!shouldFetch) return []

  try {
    const adsAmount = args.sponsoredCount ?? DEFAULT_SPONSORED_COUNT

    const categoryName =
      args?.selectedFacets?.length &&
      args.selectedFacets.some(
        (facet) =>
          facet.key.startsWith('category') ||
          facet.key === 'c' ||
          facet.key === 'categoria'
      )
        ? args.selectedFacets
            .filter(
              (facet) =>
                facet.key.startsWith('category') ||
                facet.key === 'c' ||
                facet.key === 'categoria'
            )
            .map((facet) => facet.value)
            .join(' > ')
        : undefined

    const brandName = args?.selectedFacets
      ?.filter((facet) => BRAND_FACET_KEYS.includes(facet.key?.toLowerCase()))
      .map((facet) => facet.value)[0]

    const tags = args.selectedFacets
      ?.filter((facet) => facet.key?.toLowerCase() === PRODUCT_CLUSTER_MAP)
      .map((facet) => `product_cluster/${facet.value}`)

    const skus = getSkus(args.query)
    // If SKUs are not null, this a recommendation query. So we should not set
    // the query parameter. Instead, we just set the skus parameter.
    const term = skus === undefined ? args.query : undefined

    const body: NewtailRequest = {
      term,
      context: getContext(categoryName, brandName, term),
      category_name: categoryName,
      skus,
      placements: definePlacements(adsAmount, args.placement),
      user_id: args.userId,
      session_id: hasMacId ? args.macId : DEFAULT_SESSION_ID,
      tags: tags && tags?.length > 0 ? tags : undefined,
      product_sku: args.skuId,
      brand_name: brandName,
    }

    const publisherId = await getNewtailPublisherId(ctx)
    const newtailResponse = await ctx.clients.newtail.getSponsoredProducts(
      body,
      publisherId
    )

    const res = mapSponsoredProduct(newtailResponse, hasMacId, args.placement)

    return res
  } catch (error) {
    if (error.response?.data === Newtail.ERROR_MESSAGES.AD_NOT_FOUND) return []

    throw error
  }
}
