import { createStore, createLogger } from 'vuex'
import { CommonModule as common, Store as CommonStore, State as CommonState } from "./module/common";
import { UserModule as user, Store as UserStore, State as userState } from "./module/user";
import { BuyCartModule as buyCart, Store as BuyCartStore, State as BuyCartState } from './module/buyCart';
import { AddressModule as address, Store as AddressStore, State as AddressState } from './module/address';
import { OrderModule as order, Store as OrderStore, State as OrderState } from './module/order';
export type State = {
  user: userState;
  buyCart: BuyCartState;
  address: AddressState;
  common: CommonState;
  order: OrderState;
}

export type Store =
  UserStore<Pick<State, 'user'>> & BuyCartStore<Pick<State, 'buyCart'>> & AddressStore<Pick<State, 'address'>> & CommonStore<Pick<State, 'common'>> & OrderStore<Pick<State, 'order'>>;

const plugins = process.env.NODE_ENV === 'production' ? [] : [createLogger()]

export const store = createStore({
  plugins: plugins,
  modules: {
    user,
    buyCart,
    address,
    common,
    order
  },
})

export function useStore(): Store {
  return store as Store
}

export default store