import Newtail from '../../clients/Newtail'
import type {
  NewtailResponse,
  NewtailPlacement,
  PlacementResponse,
  NewtailRequest,
} from '../../typings/Newtail'
import {getNewtailPublisherId} from '../../utils/getNewtailPublisherID'
import { shouldFetchSponsoredProducts } from '../../utils/shouldFetchSponsoredProducts'

const RULE_ID = 'sponsoredProduct'
const PRODUCT_SKU_IDENTIFIER_FIELD = 'skuId'
const DEFAULT_SPONSORED_COUNT = 3
const DEFAULT_PLACEMENT_NAME = 'ads_newtail'
const DEFAULT_CAMPAIGN_ID = ''

const getPlacementList = (
  newtailResponse: NewtailResponse,
  placement: string
): PlacementResponse[] => {
  return (newtailResponse[placement] as PlacementResponse[]) ?? []
}

const encodeBase64 = (str: string): string => {
  return Buffer.from(str).toString('base64')
}

const mapSponsoredProduct = (
  newtailResponse: NewtailResponse,
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
        adId: encodeBase64(impression_url),
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

const validateParams = (args: SponsoredProductsParams): void => {
  if (!args.macId) {
    throw new Error("macId is required but was not provided.");
  }
}
export async function newtailSponsoredProducts(
  _: unknown,
  args: SponsoredProductsParams,
  ctx: Context
): Promise<SponsoredProduct[]> {
  validateParams(args);

  const shouldFetch = await shouldFetchSponsoredProducts(args, ctx)
  if (!shouldFetch) return []

  try {
    const adsAmount = args.sponsoredCount ?? DEFAULT_SPONSORED_COUNT

    const categoryName =
      args?.selectedFacets?.length && args.selectedFacets.some((facet) => facet.key.startsWith("category"))
        ? args.selectedFacets
            .filter((facet) => facet.key.startsWith("category"))
            .map((facet) => facet.value)
            .join(" > ")
        : undefined;

    const context = args?.query?.length ? 'search' : (categoryName ? 'category' : 'home')

    const tags = args?.selectedFacets?.length && args.selectedFacets.some((facet) => facet.key === "productClusterIds")
      ? args.selectedFacets
          .filter((facet) => facet.key === "productClusterIds")
          .map((facet) => `product_cluster/${facet.value}`)
      : undefined;

    const body: NewtailRequest = {
      term: args.query,
      context,
      category_name: categoryName,
      placements: definePlacements(adsAmount, args.placement),
      user_id: args.userId,
      session_id: args.macId,
      tags,
    }

    const publisherId = await getNewtailPublisherId(ctx)
    const newtailResponse = await ctx.clients.newtail.getSponsoredProducts(body, publisherId)

    return mapSponsoredProduct(newtailResponse, args.placement)
  } catch (error) {
    if (error.response?.data === Newtail.ERROR_MESSAGES.AD_NOT_FOUND) return []

    throw error
  }
}
