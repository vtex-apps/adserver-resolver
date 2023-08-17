export async function sponsoredProducts(
  _: unknown,
  args: SearchParams,
  __: Context
): Promise<SponsoredProduct[]> {
  if (args.query === 'top') {
    return [
      {
        productId: '8',
        rule: { id: 'myPromotedProduct' },
      },
    ]
  }

  return []
}
