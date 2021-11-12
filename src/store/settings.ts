import { GetterTree, MutationTree } from 'vuex'

export const state = () => ({
  theme: 'light',
  currency: 'usd',
  signupStep: 0,
  signupPhone: ''
})

export const initialStateValue = state()
export type State = typeof initialStateValue

export const getters: GetterTree<State, State> = {
  currency: (state: State) => state.currency,
  signupStep: (state: State) => state.signupStep,
  signupPhone: (state: State) => state.signupPhone,
}

export const mutations: MutationTree<State> = {
  setCurrency(state: State, code: string) {
    state.currency = code
  },

  setSignupState(state: State, payload: { step?: number, phone?: string }) {
    state.signupStep = payload.step ?? state.signupStep
    state.signupPhone = payload.phone ?? state.signupPhone
  },

  setColorTheme(state: State, theme: string) {
    state.theme = theme
  },
}
