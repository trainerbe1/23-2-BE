<template>
    <div>
      <!-- Tombol untuk membuka modal -->
      <b-button @click="showLoginModal" variant="primary">Login</b-button>
  
      <!-- Modal login -->
      <b-modal v-model="loginModal" title="Login">
        <!-- Form login -->
        <b-form @submit.prevent="login">
          <b-form-group id="username" label="Username:" label-for="username-input">
            <b-form-input id="username-input" v-model="username" required></b-form-input>
          </b-form-group>
  
          <b-form-group id="password" label="Password:" label-for="password-input">
            <b-form-input id="password-input" v-model="password" type="password" required></b-form-input>
          </b-form-group>
  
          <b-button type="submit" variant="primary">Login</b-button>
        </b-form>
      </b-modal>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useStore } from 'vuex'; // Jika menggunakan Vuex untuk manajemen state
  
  export default {
    name: 'LoginModal',
    setup() {
      const store = useStore(); // Mengambil store Vuex jika digunakan
      const loginModal = ref(false);
      const username = ref('');
      const password = ref('');
  
      const showLoginModal = () => {
        loginModal.value = true;
      };
  
      const login = async () => {
        try {
          // Implementasi logika login disini
          // Misalnya menggunakan Vuex untuk mengirim data login ke backend
          await store.dispatch('login', { username: username.value, password: password.value });
          loginModal.value = false; // Tutup modal setelah login berhasil
        } catch (error) {
          console.error('Login error:', error);
          // Tampilkan pesan error jika login gagal
          // Anda juga dapat menambahkan state error di data dan menampilkannya di modal
        }
      };
  
      return {
        loginModal,
        showLoginModal,
        login,
        username,
        password,
      };
    },
  };
  </script>
  