// store/modules/auth.js
import apiService from '@/api/apiService';
const state = () => ({
    isAuthenticated: false,
    user: null,
    userRole: null,
  });
  
  const mutations = {
    SET_AUTHENTICATED(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated;
    },
    SET_USER(state, user) {
      state.user = user;
    },
    SET_USER_ROLE(state, role) {
      state.userRole = role;
    },
  };
  
  const actions = {
    async login({ commit }, payload) {
      try {
        // Panggil API login dan simpan respons
        const response = await apiService.login(payload);
  
        // Simpan token ke cookie
        const token = response.data.token;
        this.$cookies.set('meal_mastery', token);
  
        // Setel state autentikasi
        commit('SET_AUTHENTICATED', true);
  
        // Setel data pengguna
        const user = response.data.user;
        commit('SET_USER', user);
  
        // Setel peran pengguna
        const role = response.data.role;
        commit('SET_USER_ROLE', role);
  
        // Redirect ke halaman yang sesuai berdasarkan peran
        if (role === 'admin') {
          this.$router.push({ name: 'admin' });
        } else {
          this.$router.push({ name: 'home' });
        }
      } catch (error) {
        console.error('Login failed:', error);
        throw error;
      }
    },
    
    async logout({ commit }) {
        
      try {
        // Panggil API logout jika diperlukan
        // Hapus token dari cookie
        this.$cookies.remove('meal_mastery');
  
        // Reset state autentikasi dan data pengguna
        commit('SET_AUTHENTICATED', false);
        commit('SET_USER', null);
        commit('SET_USER_ROLE', null);
  
        // Redirect ke halaman login
        this.$router.push({ name: 'LoginPage' });
      } catch (error) {
        console.error('Logout failed:', error);
        throw error;
      }
    },
  };
  
  export default {
    state,
    mutations,
    actions,
  };
  