import region from '../../utils/region'

describe('region#toSelectedFacets', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let ctx: any

  beforeEach(() => {
    ctx = {
      clients: {
        checkout: {
          regions: jest.fn(),
        },
      },
    }
  })

  it('should return an array of selected facets', async () => {
    ctx.clients.checkout.regions.mockResolvedValue([
      { id: '1' },
      { id: '2' },
      { id: '3' },
    ])

    const result = await region.toSelectedFacets('1', ctx as unknown as Context)

    expect(result).toMatchObject([
      { key: 'private-seller', value: '1' },
      { key: 'private-seller', value: '2' },
      { key: 'private-seller', value: '3' },
    ])
  })

  it('should return an empty array if regionId is undefined', async () => {
    const result = await region.toSelectedFacets(
      undefined,
      ctx as unknown as Context
    )

    expect(result).toMatchObject([])
  })

  it('should return an empty array if checkout.regions returns undefined', async () => {
    ctx.clients.checkout.regions.mockResolvedValue(undefined)

    const result = await region.toSelectedFacets('1', ctx as unknown as Context)

    expect(result).toMatchObject([])
  })

  it('should return an empty array if checkout.regions throws an error', async () => {
    ctx.clients.checkout.regions.mockRejectedValue('Error')

    const result = await region.toSelectedFacets('1', ctx as unknown as Context)

    expect(result).toMatchObject([])
  })
})

describe('region#fromSegment', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let ctx: any

  beforeEach(() => {
    ctx = {
      clients: {
        segment: {
          getSegment: jest.fn(),
        },
      },
      vtex: {
        segmentToken: undefined,
      },
    }
  })

  it('should return the segment from client if segmentToken is undefined', async () => {
    ctx.clients.segment.getSegment.mockResolvedValue({ regionId: '1' })

    const result = await region.fromSegment(ctx as unknown as Context)

    expect(result).toBe('1')
  })

  it('should return the segment from segmentToken if segmentToken is defined', async () => {
    ctx.vtex.segmentToken = Buffer.from(
      JSON.stringify({ regionId: '2' })
    ).toString('base64')

    const result = await region.fromSegment(ctx as unknown as Context)

    expect(result).toBe('2')
  })

  it('should return undefined if segment.getSegment returns undefined', async () => {
    ctx.clients.segment.getSegment.mockResolvedValue(undefined)

    const result = await region.fromSegment(ctx as unknown as Context)

    expect(result).toBeUndefined()
  })

  it('should return undefined if segment.getSegment throws an error', async () => {
    ctx.clients.segment.getSegment.mockRejectedValue('Error')

    const result = await region.fromSegment(ctx as unknown as Context)

    expect(result).toBeUndefined()
  })
})
