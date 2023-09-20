// eslint-disable-next-line prettier/prettier
import type { ParamsContext, RecorderState } from '@vtex/api'
import { Service } from '@vtex/api'
import schema from 'vtex.is-api-middleware-graphql/graphql'

import { Clients } from './clients'
import { resolvers } from './resolvers'

const THREE_SECONDS_MS = 3 * 1000

export default new Service<Clients, RecorderState, ParamsContext>({
  clients: {
    implementation: Clients,
    options: {
      default: {
        retries: 2,
        timeout: THREE_SECONDS_MS,
      },
    },
  },
  graphql: {
    resolvers,
    schema,
  },
})
