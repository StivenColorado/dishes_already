import { CartStore } from "./cartStore"
import { ProductStore } from "./productStore"
import { ThemeStore } from "./themeStore"

export class RootStore {
  cartStore: CartStore
  productStore: ProductStore
  themeStore: ThemeStore

  constructor() {
    this.cartStore = new CartStore()
    this.productStore = new ProductStore()
    this.themeStore = new ThemeStore()
  }
}

export const rootStore = new RootStore()
