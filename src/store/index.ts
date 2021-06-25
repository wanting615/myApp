import { createStore, createLogger } from 'vuex'
import { UserModule as user, Store as UserStore, State as userState } from "./module/User";
import { BuyCartModule as buyCart, Store as BuyCartStore, State as BuyCartState } from './module/BuyCart';

export type State = {
  user: userState;
  buyCart: BuyCartState;
}

export type Store =
  UserStore<Pick<State, 'user'>> & BuyCartStore<Pick<State, 'buyCart'>>

const plugins = process.env.NODE_ENV === 'production' ? [] : [createLogger()]

export const store = createStore({
  plugins: plugins,
  modules: {
    user,
    buyCart
  },
})

export function useStore(): Store {
  return store as Store
}

export default store