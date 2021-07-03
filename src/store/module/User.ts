import {
  ActionContext,
  ActionTree,
  // GetterTree,
  MutationTree,
  Module,
  Store as VuexStore,
  CommitOptions,
  DispatchOptions,
  GetterTree,
} from 'vuex'
import { State as RootState } from '@/store'
import { UserInfo } from './../../interface/user';
import { getUserInfo } from '@/api/user/user';


export type State = {
  userInfo: UserInfo | null;
  loginToken: string;
}
const state: State = {
  userInfo: null,
  loginToken: "",
}

export type Mutations<S = State> = {
  setUserInfo(state: S, userInfo: UserInfo): void;
  delUserInfo(state: S): void;
  setLoginToken(state: S, loginToken: string): void;
  delLoginToken(state: State): void;
}
const mutations: MutationTree<State> & Mutations = {
  //保存用户信息
  setUserInfo(state: State, userInfo: UserInfo) {
    state.userInfo = userInfo;
  },
  delUserInfo(state: State) {
    state.userInfo = null;
  },
  //保存登陆token
  setLoginToken(state: State, loginToken: string) {
    state.loginToken = loginToken;
  },
  delLoginToken(state: State) {
    state.loginToken = '';
    localStorage.setItem('loginToken', '');
  }
}


type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1],
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, RootState>, 'commit'>
export interface Actions {
  updateUserInfo(
    { commit }: AugmentedActionContext,
    token: string,
  ): void;
}

// Define actions
export const actions: ActionTree<State, RootState> & Actions = {
  //更新用户信息
  updateUserInfo(
    { commit },
    token: string,
  ) {
    try {
      getUserInfo(token).then(res => {
        if (res.status) {
          commit('setUserInfo', res.data)
        }
      })
    } catch (err) {
      console.log(err)
    }
  },
}

// getters types
export type Getters = {
  getToken(state: State): string | null;
}

// getters
export const getters: GetterTree<State, RootState> & Getters = {
  getToken: (state: State) => {
    return state.loginToken || localStorage.getItem('logonToken');
  },
}

export type Store<S = State> = Omit<
  VuexStore<S>,
  'commit' | 'getters' | 'dispatch'
> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload?: P | undefined,
    options?: CommitOptions,
  ): ReturnType<Mutations[K]>;
} & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>
  };
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload: Parameters<Actions[K]>[1],
    options?: DispatchOptions,
  ): ReturnType<Actions[K]>;
}

export const UserModule: Module<State, RootState> = {
  state,
  mutations,
  actions,
  // getters,
}
