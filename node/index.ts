// eslint-disable-next-line prettier/prettier
import type { ParamsContext, RecorderState } from '@vtex/api'
import { Service } from '@vtex/api'
import schema from 'vtex.is-api-middleware-graphql/graphql'

import { resolvers } from './resolvers'

export default new Service<any, RecorderState, ParamsContext>({
  graphql: {
    resolvers,
    schema,
  },
})
