import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { getTokenFromCookie } from '../src/api/AuthService'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import '@/api/apiService'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/css/main.css'
import VueCookies from 'vue-cookies'

console.log('API Base URL:', process.env.VUE_APP_API_BASE_URL);

Vue.use(VueCookies)
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  created() {
    const token = getTokenFromCookie();
    if (token) {
      this.$store.dispatch('setToken', token);
      this.$store.dispatch('fetchUser'); // Dapatkan data user jika perlu
    }
  },
  render: h => h(App)
}).$mount('#app')
