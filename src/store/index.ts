import { GetterTree, MutationTree } from "vuex";
import Vue from "vue";

export const state = () => ({
  fetching: {} as {[key: string]: boolean}
});

export const initialStateValue = state();
export type State = typeof initialStateValue

export const getters: GetterTree<State, State> = {
  fetching: (state: State): boolean => Object.keys(state.fetching).length > 0
};

export const mutations: MutationTree<State> = {
  addFetching: (state: State, fetchingName: string) => Vue.set(state.fetching, fetchingName, true),
  removeFetching: (state: State, fetchingName: string) => Vue.delete(state.fetching, fetchingName)
}
