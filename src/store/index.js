import { createStore } from "vuex";

export const store = createStore({
  state: {
    isMenuOpened: false,
  },
  mutations: {
    setMenuOpen(state) {
      state.isMenuOpened = !state.isMenuOpened;
    },
  },
  actions: {
    changeStatusMenuOpen(context) {
      context.commit("setMenuOpen");
    },
  },
});
