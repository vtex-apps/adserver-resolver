import { IOClients } from '@vtex/api'

import AdServer from './AdServer'
import Checkout from './Checkout'
import Newtail from './Newtail'

export class Clients extends IOClients {
  public get adServer() {
    return this.getOrSet('adServer', AdServer)
  }

  public get newtail() {
    return this.getOrSet('newtail', Newtail)
  }

  public get checkout() {
    return this.getOrSet('checkout', Checkout)
  }
}
