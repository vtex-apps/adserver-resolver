import {shouldUseNewtail} from "../../utils/shouldUseNewtail";
import {newtailSponsoredProducts} from "./newtail";
import {vtexSponsoredProducts} from "./vtex";


export async function sponsoredProducts(
  arg: unknown,
  params: SponsoredProductsParams,
  ctx: Context
): Promise<SponsoredProduct[]> {
  const should = await shouldUseNewtail(ctx)

  if (should) {
    return newtailSponsoredProducts(arg, params, ctx)
  }

  return vtexSponsoredProducts(arg, params, ctx)
}
