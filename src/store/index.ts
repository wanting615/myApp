import { createStore, createLogger } from 'vuex'

// import {
//   AuthModule as auth,
//   Store as AuthStore,
//   State as AuthState,
// } from './module/User'

import {
  BuyCartModule as buyCart,
  Store as BuyCartStore,
  State as BuyCartState,
} from './module/BuyCart'

export type State = {
  // auth: AuthState;
  buyCart: BuyCartState;
}

export type Store =
  // AuthStore<Pick<State, 'auth'>> &
  BuyCartStore<Pick<State, 'buyCart'>>

const plugins = process.env.NODE_ENV === 'production' ? [] : [createLogger()]

export const store = createStore({
  plugins: plugins,
  modules: {
    // auth, 
    buyCart
  },
})

export function useStore(): Store {
  return store as Store
}

export default store