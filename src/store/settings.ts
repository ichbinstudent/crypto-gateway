import { GetterTree, MutationTree } from 'vuex'

export const state = () => ({
  theme: 'light',
  currency: 'usd',
})

export const initialStateValue = state()
export type State = typeof initialStateValue

export const getters: GetterTree<State, State> = {
  currency: (state: State) => state.currency,
}

export const mutations: MutationTree<State> = {
  setCurrency(state: State, code: string) {
    state.currency = code
  },

  setColorTheme(state: State, theme: string) {
    state.theme = theme
  },
}
