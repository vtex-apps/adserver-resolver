import AdServer from '../clients/AdServer'
import type {
  AdServerResponse,
  AdServerSearchParams,
} from '../typings/AdServer'
import compact from '../utils/compact'
import region from '../utils/region'
import { shouldFetchSponsoredProducts } from '../utils/shouldFetchSponsoredProducts'

const RULE_ID = 'sponsoredProduct'
const PRODUCT_UNIQUE_IDENTIFIER_FIELD = 'product'
const DEFAULT_SPONSORED_COUNT = 3

const getSearchParams = (
  args: SearchParams,
  privateSellers: SelectedFacet[]
): AdServerSearchParams => {
  const adServerSearchParams = {
    query: args.query,
    selectedFacets: [...privateSellers, ...(args.selectedFacets ?? [])],
  }

  return compact(adServerSearchParams)
}

const mapSponsoredProduct = (
  adResponse: AdServerResponse
): SponsoredProduct[] => {
  if (!adResponse?.sponsoredProducts) return []

  return adResponse.sponsoredProducts?.map(
    ({ productId, campaignId, adId, actionCost, options }) => {
      const advertisement = {
        campaignId,
        adId,
        actionCost,
        adRequestId: adResponse?.adRequestId,
        adResponseId: adResponse?.adResponseId,
        options,
      }

      return {
        productId,
        identifier: {
          field: PRODUCT_UNIQUE_IDENTIFIER_FIELD,
          value: productId,
        },
        rule: { id: RULE_ID },
        advertisement,
        sellerId: "",
      }
    }
  )
}

export async function sponsoredProducts(
  _: unknown,
  args: SponsoredProductsParams,
  ctx: Context
): Promise<SponsoredProduct[]> {
  const shouldFetch = await shouldFetchSponsoredProducts(args, ctx)

  if (!shouldFetch) return []

  const regionId = args.regionId ?? (await region.fromSegment(ctx))
  const privateSellers = await region.toSelectedFacets(regionId, ctx)

  try {
    const adResponse = await ctx.clients.adServer.getSponsoredProducts({
      searchParams: getSearchParams(args, privateSellers),
      count: args.sponsoredCount ?? DEFAULT_SPONSORED_COUNT,
      placement: args.placement,
      userId: args.anonymousId,
    })

    return mapSponsoredProduct(adResponse)
  } catch (error) {
    if (error.response?.data === AdServer.ERROR_MESSAGES.AD_NOT_FOUND) return []

    throw error
  }
}
