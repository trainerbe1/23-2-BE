<template>
  <div class="login-page">
    <LoginNavbar />
    <div class="login-container d-flex align-items-center justify-content-center">
      <div class="col-12 col-md-8 col-lg-6">
        <div class="card shadow-lg p-4">
          <div class="card-body">
            <h3 class="card-title text-center mb-4"><strong>Log in</strong></h3>
            <b-form @submit.prevent="handleLogin">
              <b-form-group label="Email address" label-for="email">
                <b-form-input
                  id="email"
                  type="email"
                  v-model="email"
                  required
                  placeholder="email@example.com"
                ></b-form-input>
              </b-form-group>

              <b-form-group label="Password" label-for="password">
                <div class="input-group">
                  <b-form-input
                    id="password"
                    :type="passwordFieldType"
                    v-model="password"
                    required
                    placeholder="******"
                  ></b-form-input>
                  <div class="input-group-append">
                    <b-button variant="outline-secondary" @click="togglePasswordVisibility">
                      <b-icon :icon="passwordToggleIcon"></b-icon>
                    </b-button>
                  </div>
                </div>
              </b-form-group>

              <b-button
                type="submit"
                variant="primary"
                class="w-100 bg-warning border-0 text-white"
              >Login</b-button>
            </b-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import { mapActions } from 'vuex';
import LoginNavbar from '@/components/LoginNavbar.vue';

export default {
  name: "LoginPage",
  components: {
    LoginNavbar
  },
  data() {
    return {
      email: "",
      password: "",
      showPassword: false
    };
  },
  computed: {
    passwordFieldType() {
      return this.showPassword ? 'text' : 'password';
    },
    passwordToggleIcon() {
      return this.showPassword ? 'eye-slash' : 'eye';
    }
  },
  methods: {
    ...mapActions(['login']),
    async handleLogin() {
      // Periksa data pengguna di localStorage
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find(user => user.email === this.email && user.password === this.password);

      if (user) {
        // Tampilkan loading spinner
        Swal.fire({
          title: 'Logging in...',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          }
        });

        // Simulasi delay untuk login (misalnya, untuk request ke server)
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Simpan data pengguna dan ubah status autentikasi
        this.login(user);
        
        // Update swal dengan pesan sukses
        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          showConfirmButton: false,
          timer: 1500
        });

        // Arahkan pengguna ke halaman utama setelah login berhasil
        setTimeout(() => {
          this.$router.push({ name: 'home' });
        }, 1500);
      } else {
        // Tampilkan pesan kesalahan menggunakan SweetAlert2
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: 'Incorrect email or password. Please try again.',
        });
      }
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    }
  },
};
</script>

<style scoped>
.navbar-brand {
  font-family: "Brush Script MT", cursive;
  font-size: 1.5rem;
}

.login-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: url("@/assets/background.jpg") no-repeat center center fixed;
  background-size: cover;
}

.navbar {
  flex-shrink: 0;
}

.login-container {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card {
  border-radius: 1rem;
}

.input-group-text {
  cursor: pointer;
}

/* Tambahan untuk mempercantik form login */
.card-title {
  font-size: 1.5rem;
  font-weight: bold;
}

.b-button {
  font-size: 1rem;
  font-weight: bold;
}

.input-group {
  margin-bottom: 1rem;
}

</style>
