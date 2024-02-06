import { JanusClient } from '@vtex/api'

export type RegionSeller = {
  id: string
  name: string
}

export type Region = {
  id: string
  sellers: RegionSeller[]
}

class Checkout extends JanusClient {
  public regions = (
    regionId: string,
    channel?: number | string
  ): Promise<Region[]> => {
    const url = `/api/checkout/pub/regions/${regionId}`

    return this.http.get(url, {
      params: {
        sc: channel,
      },
    })
  }
}

export default Checkout
