import Vue from 'vue';
import Vuex from 'vuex';
import apiService from '../api/apiService';
import router from '../router';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isAuthenticated: false,
    userId: null,
    userRole: null,
    username: null,
    token: null,
    favorites: [],
    groceries: [],
  },
  mutations: {
    SET_AUTHENTICATED(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated;
    },
    SET_USER(state, user) {
      state.userId = user.userId;
      state.username = user.username;
      state.userRole = user.role;
    },
    SET_TOKEN(state, token) {
      state.token = token;
    },
    ADD_FAVORITE(state, recipe) {
      state.favorites.push(recipe);
    },
    REMOVE_FAVORITE(state, recipeId) {
      state.favorites = state.favorites.filter(r => r.id !== recipeId);
    },
    ADD_GROCERIES(state, recipe) {
      state.groceries.push(recipe);
    },
    REMOVE_GROCERIES(state, recipeId) {
      state.groceries = state.groceries.filter(r => r.id !== recipeId);
    },
    CLEAR_ALL_FAVORITES(state) {
      state.favorites = [];
    },
    CLEAR_ALL_GROCERIES(state) {
      state.groceries = [];
    }
  },
  actions: {
    async login({ commit }, payload) {
      const response = await apiService.login(payload);
      commit('SET_AUTHENTICATED', true);
      commit('SET_USER', response.data);
      commit('SET_TOKEN', response.data.token);

      // Simpan token di localStorage
      localStorage.setItem('token', response.data.token);

      if (response.data.role === 'ADMIN') {
        router.push('/admin');
      } else {
        router.push('/');
      }
    },
    async logout({ commit }) {
      await apiService.logout();
      commit('SET_AUTHENTICATED', false);
      commit('SET_USER', { userId: null, username: null, role: null });
      commit('SET_TOKEN', null);

      // Hapus token dari localStorage
      localStorage.removeItem('token');

      if (router.currentRoute.path !== '/login') {
        router.push('/login');
      }
    },
    setToken({ commit }, token) {
      commit('SET_TOKEN', token);
      commit('SET_AUTHENTICATED', true);
    },
    async fetchUser({ commit }) {
      try {
        const response = await apiService.getUser();
        commit('SET_USER', response.data);
      } catch (error) {
        commit('SET_AUTHENTICATED', false);
        commit('SET_USER', { userId: null, username: null, role: null });
        commit('SET_TOKEN', null);
      }
    },
    async fetchUserById({ commit }, userId) {
      try {
        const response = await apiService.getUserById(userId);
        commit('SET_USER', response.data);
      } catch (error) {
        commit('SET_AUTHENTICATED', false);
        commit('SET_USER', { userId: null, username: null, role: null });
        commit('SET_TOKEN', null);
      }
    },
    async toggleFavorite({ commit, state }, recipe) {
      const existingRecipe = state.favorites.find(r => r.id === recipe.id);
      if (existingRecipe) {
        commit('REMOVE_FAVORITE', recipe.id);
      } else {
        commit('ADD_FAVORITE', recipe);
      }
    },
    async toggleGroceries({ commit, state }, recipe) {
      const existingRecipe = state.groceries.find(r => r.id === recipe.id);
      if (existingRecipe) {
        commit('REMOVE_GROCERIES', recipe.id);
      } else {
        commit('ADD_GROCERIES', recipe);
      }
    },
    clearAllFavorites({ commit }) {
      commit('CLEAR_ALL_FAVORITES');
    },
    clearAllGroceries({ commit }) {
      commit('CLEAR_ALL_GROCERIES');
    }
  },
  getters: {
    isAuthenticated: state => state.isAuthenticated,
    userRole: state => state.userRole,
    username: state => state.username,
    token: state => state.token,
    favorites: state => state.favorites,
    groceries: state => state.groceries,
  },
});
