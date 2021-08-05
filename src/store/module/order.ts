import { Store as VuexStore, MutationTree, CommitOptions, Module } from 'vuex';
import { State as RootState } from '@/store'


export type State = {
  remarks: string;//备注
}

const state: State = {
  remarks: ''
}

export type Mutations<S = State> = {
  setRemarks(s: S, remark: string): void;
}

const mutations: MutationTree<State> & Mutations = {
  setRemarks(state: State, remark: string) {
    state.remarks = remark;
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