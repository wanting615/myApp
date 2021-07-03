import {
  GetterTree,
  Store as VuexStore,
  CommitOptions,
  MutationTree,
  Module,
} from 'vuex';
import commonUntil from "@/until/common.service";
import { Food } from "@/interface/foodsInterface"
import { State as RootState } from '@/store'


export type State = {
  shopId: string;
  foods: Food[];
}
const state: State = {
  shopId: "",
  foods: [],
}

export type Mutations<S = State> = {
  setShopId(state: S, shopId: string): void;
  setFoods(state: S, food: Food): void;
  delFoods(state: S, food: Food): void;
  clearFoods(state: S): void;
}

const mutations: MutationTree<State> & Mutations = {
  setShopId(state: State, shopId: string) {
    state.shopId = shopId;
    state.foods = [];
  },
  setFoods(state: State, food: Food) {
    const index = state.foods.findIndex((item: Food) => item.item_id === food.item_id);
    if (index === -1) {
      const cloneFood = commonUntil.deepColone(food);
      state.foods.push(cloneFood)
    } else {
      state.foods[index].num++;
    }
  },
  delFoods(state: State, food: Food) {
    const index = state.foods.findIndex((item: Food) => item.item_id === food.item_id);
    if (state.foods[index].num === 1) {
      state.foods.splice(index, 1);
    } else {
      state.foods[index].num -= 1;
    }
  },
  clearFoods(state: State) {
    state.foods = [];
  }
}

export type Getters = {
  getFood(state: State): Food[];
}

export const getters: GetterTree<State, RootState> & Getters = {
  getFood: (state) => {
    return state.foods;
  },
}

export type Store<S = State> = Omit<
  VuexStore<S>,
  'commit' | 'getters'
> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload?: P,
    options?: CommitOptions,
  ): ReturnType<Mutations[K]>;
} & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>
  };
}

export const BuyCartModule: Module<State, RootState> = {
  state,
  mutations,
  getters,
}