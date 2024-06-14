import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isAuthenticated: false,
    user: null,
  },
  mutations: {
    login(state, user) {
      state.isAuthenticated = true;
      state.user = user;
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('isAuthenticated', true);
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem('user');
      localStorage.removeItem('isAuthenticated');
    },
    initializeStore(state) {
      const user = localStorage.getItem('user');
      const isAuthenticated = localStorage.getItem('isAuthenticated');
      if (isAuthenticated && user) {
        state.isAuthenticated = true;
        state.user = JSON.parse(user);
      }
    },
    updateUser(state, updatedUser) {
      state.user = { ...state.user, ...updatedUser };
      localStorage.setItem('user', JSON.stringify(state.user));
    }
  },
  actions: {
    login({ commit }, user) {
      commit('login', user);
    },
    logout({ commit }) {
      commit('logout');
    },
    initializeStore({ commit }) {
      commit('initializeStore');
    },
    updateUser({ commit }, updatedUser) {
      commit('updateUser', updatedUser);
    }
  }
});