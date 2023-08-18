import { IOClients } from '@vtex/api'

import AdServer from './AdServer'

export class Clients extends IOClients {
  public get adServer() {
    return this.getOrSet('adServer', AdServer)
  }
}
