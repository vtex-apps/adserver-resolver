async function toSelectedFacets(
  regionId: string | undefined,
  ctx: Context
): Promise<SelectedFacet[]> {
  const {
    clients: { checkout },
    vtex: { logger },
  } = ctx

  if (!regionId) {
    return []
  }

  try {
    // eslint-disable-next-line no-console
    console.log(regionId)
    const regions = (await checkout.regions(regionId)) ?? []

    // eslint-disable-next-line no-console
    console.log(JSON.stringify(regions))
    const region = regions.find((r) => r.id === regionId)
    const sellers = region?.sellers ?? []

    return sellers.map((seller) => ({
      key: 'private-seller',
      value: seller.id,
    }))
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(e))
    logger.error(e)

    return []
  }
}

async function fromSegment(ctx: Context): Promise<string | undefined> {
  const {
    clients: { segment },
    vtex: { segmentToken, logger },
  } = ctx

  try {
    const segmentData = segmentToken
      ? JSON.parse(Buffer.from(segmentToken, 'base64').toString())
      : await segment.getSegment()

    return segmentData?.regionId
  } catch (e) {
    logger.error(e)

    return undefined
  }
}

export default { toSelectedFacets, fromSegment }
