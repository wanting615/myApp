import { Location, DeliveryAddressInfo, AddAddressInfo } from "@/interface/addressInterface"
import { CommitOptions, Module, MutationTree, Store as VuexStore, } from "vuex"
import { State as RootState } from '@/store'

export type State = {
  location: Location;//当前用户位置信息
  deliveryAddressInfo: Nullable<DeliveryAddressInfo>;//当前收货地址
  addAddressInfo: Nullable<AddAddressInfo>;
}

const state: State = {
  location: {
    lng: 31.215616,
    lat: 121.458145
  },
  deliveryAddressInfo: null,
  addAddressInfo: null,
}

export type Mutations<S = State> = {
  setLoaction(state: S, loaction: Location): void;
  setDeliveryAddressInfo(state: S, deliveryAddressInfo: DeliveryAddressInfo): void;
  setAddAddressInfo(state: S, addAddressInfo: AddAddressInfo | null): void;
}

const mutations: MutationTree<State> & Mutations = {
  setLoaction(state: State, location: Location) {
    state.location = location;
  },
  setDeliveryAddressInfo(state: State, deliveryAddressInfo: DeliveryAddressInfo) {
    state.deliveryAddressInfo = deliveryAddressInfo;
  },
  setAddAddressInfo(state: State, addAddressInfo: AddAddressInfo) {
    state.addAddressInfo = addAddressInfo;
  },
}

export type Store<S = State> = Omit<
  VuexStore<S>,
  'commit'
> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions,
  ): ReturnType<Mutations[K]>;
}

export const AddressModule: Module<State, RootState> = {
  state,
  mutations,
}