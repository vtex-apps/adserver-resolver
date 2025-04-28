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
    console.log('arg', arg, 'params', params)
    const resp = await newtailSponsoredProducts(arg, params, ctx)
    return resp
  }

  return vtexSponsoredProducts(arg, params, ctx)
}
