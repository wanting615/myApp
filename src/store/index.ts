import { createStore, createLogger } from 'vuex'
import { UserModule as user, Store as UserStore, State as userState } from "./module/User";
import { BuyCartModule as buyCart, Store as BuyCartStore, State as BuyCartState } from './module/BuyCart';
import { AddressModule as address, Store as AddressStore, State as AddressState } from './module/address';
export type State = {
  user: userState;
  buyCart: BuyCartState;
  address: AddressState;
}

export type Store =
  UserStore<Pick<State, 'user'>> & BuyCartStore<Pick<State, 'buyCart'>> & AddressStore<Pick<State, 'address'>>

const plugins = process.env.NODE_ENV === 'production' ? [] : [createLogger()]

export const store = createStore({
  plugins: plugins,
  modules: {
    user,
    buyCart,
    address
  },
})

export function useStore(): Store {
  return store as Store
}

export default store