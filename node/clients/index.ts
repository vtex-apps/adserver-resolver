import { IOClients } from '@vtex/api'

import AdServer from './AdServer'
import Checkout from './Checkout'

export class Clients extends IOClients {
  public get adServer() {
    return this.getOrSet('adServer', AdServer)
  }

  public get checkout() {
    return this.getOrSet('checkout', Checkout)
  }
}
