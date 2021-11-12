import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { Snack } from '@/types/interfaces'

const getDefaultState = () => {
  return {
    snack: {} as Snack
  }
}

export const initialStateValue = getDefaultState()
export type State = typeof initialStateValue;

const getters: GetterTree<State, State> = {
  getSnack: (state: State) => state.snack
}

const mutations: MutationTree<State> = {
  RESET (state: State) {
    Object.assign(state, getDefaultState())
  },
  setSnack (state: State, showSnack: Snack) {
    state.snack = { ...showSnack }
  }
}

const actions: ActionTree<State, State> = {
  reset ({ commit }) {
    commit('RESET')
  }
}

export default {
  namespaced: true,
  state: getDefaultState,
  getters,
  mutations,
  actions
}
