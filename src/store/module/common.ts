import {
  MutationTree,
  Module,
  Store as VuexStore,
  CommitOptions,
  GetterTree,
} from 'vuex'
import { State as RootState } from './../index'


export type State = {
  showTabs: boolean;//是否显示底部栏
}
const state: State = {
  showTabs: true
}

export type Mutations<S = State> = {
  changeShowTabs(state: S, isShow: boolean): void;
}
const mutations: MutationTree<State> & Mutations = {
  changeShowTabs(state: State, isShow: boolean) {
    state.showTabs = isShow;
  }
}


// getters types
export type Getters = {
}

// getters
export const getters: GetterTree<State, RootState> & Getters = {

}

export type Store<S = State> = Omit<
  VuexStore<S>,
  'commit'
> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload?: P | undefined,
    options?: CommitOptions,
  ): ReturnType<Mutations[K]>;
}

export const CommonModule: Module<State, RootState> = {
  state,
  mutations,
}
