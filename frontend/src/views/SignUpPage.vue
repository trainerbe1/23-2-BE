<template>
  <div class="signup-page">
    <LoginNavbar />
    <div class="signup-container d-flex align-items-center justify-content-center">
      <div class="col-12 col-md-8 col-lg-6">
        <div class="card shadow-lg p-4">
          <div class="card-body">
            <h3 class="card-title text-center mb-4"><strong>Sign Up</strong></h3>
            <form @submit.prevent="handleSignUp">
              <div class="form-group">
                <label for="username">Username:</label>
                <input type="text" id="username" v-model="username" class="form-control" required>
              </div>

              <div class="form-group">
                <label for="email">Email address:</label>
                <input type="email" id="email" v-model="email" class="form-control" required>
              </div>

              <div class="form-group">
                <label for="password">Password:</label>
                <div class="input-group">
                  <input type="password" id="password" v-model="password" class="form-control" required>
                  <div class="input-group-append">
                    <button type="button" class="btn btn-outline-warning" @click="togglePasswordVisibility">
                      <i :class="['fa', showPassword ? 'fa-eye-slash' : 'fa-eye']"></i>
                    </button>
                  </div>
                </div>
              </div>

              <div class="form-group">
                <label for="gender">Gender:</label>
                <select id="gender" v-model="gender" class="form-control" required>
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <button type="submit" class="btn btn-warning w-100">Sign Up</button>

              <div class="mt-3 text-center text-warning">
                <router-link to="/login">Already have an account? Login</router-link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import apiService from '@/api/apiService';
import { mapActions } from 'vuex';
import LoginNavbar from '@/components/LoginNavbar.vue';

export default {
  name: "SignUp",
  components: {
    LoginNavbar
  },
  data() {
    return {
      username: "",
      email: "",
      password: "",
      gender: null,
      showPassword: false
    };
  },
  methods: {
    ...mapActions(['login']),
    async handleSignUp() {
      try {
        Swal.fire({
          title: 'Signing up...',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          }
        });

        const response = await apiService.register({
          username: this.username,
          email: this.email,
          password: this.password,
          gender: this.gender === 'male' // Mengonversi ke tipe boolean
        });
        console.log(response);

        Swal.fire({
          icon: 'success',
          title: 'Sign Up Successful',
          showConfirmButton: false,
          timer: 1000
        });

        this.$store.commit('SET_AUTHENTICATED', true);
        this.$router.push({ name: 'home' });
      } catch (error) {
        console.error('Sign Up failed:', error);
        Swal.fire({
          icon: 'error',
          title: 'Sign Up Failed',
          text: error.response.data.message || 'Something went wrong. Please try again.',
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

.signup-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: url("@/assets/background.jpg") no-repeat center center fixed;
  background-size: cover;
}

.navbar {
  flex-shrink: 0;
}

.signup-container {
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

/* Tambahan untuk mempercantik form signup */
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
