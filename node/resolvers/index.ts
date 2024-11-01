import { sponsoredBanners } from './sponsoredBanners'
import { sponsoredProducts } from './sponsoredProducts'

export const resolvers = {
  Query: {
    sponsoredProducts,
    sponsoredBanners,
  },
}
