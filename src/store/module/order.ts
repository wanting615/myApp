import { Hongbao } from '@/interface/hongbaos';
import { Store as VuexStore, MutationTree, CommitOptions, Module } from 'vuex';
import { State as RootState } from '@/store'
import { Invoice } from '@/interface/order';


export type State = {
  remarks: string;//备注
  hongbao: Nullable<Hongbao>;//红包
  inovice: Nullable<Invoice>;
}

const state: State = {
  remarks: '',
  hongbao: null,
  inovice: null
}

export type Mutations<S = State> = {
  setRemarks(s: S, remark: string): void;
  setHongbao(s: S, hongbao: Hongbao): void;
  setInvoice(s: S, invoice: Invoice): void;
  clearOrderData(s: S): void;
}

const mutations: MutationTree<State> & Mutations = {
  setRemarks(state: State, remark: string) {
    state.remarks = remark;
  },
  setHongbao(state: State, hongbao: Hongbao) {
    state.hongbao = hongbao;
  },
  setInvoice(state: State, invoice: Invoice) {
    state.inovice = invoice;
  },
  clearOrderData(state: State) {
    state.remarks = '';
    state.hongbao = null;
    state.inovice = null;
  }
}
export type Store<S = State> = Omit<
  VuexStore<S>,
  'commit'
> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload?: P,
    options?: CommitOptions,
  ): ReturnType<Mutations[K]>;
}

export const OrderModule: Module<State, RootState> = {
  state,
  mutations,
}