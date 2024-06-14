<template>
  <div class="signup-page">
    <LoginNavbar />
    <div class="signup-container d-flex align-items-center justify-content-center">
      <div class="col-12 col-md-8 col-lg-6">
        <div class="card shadow-lg p-4">
          <div class="card-body">
            <h3 class="card-title text-center mb-4"><strong>Sign Up</strong></h3>
            <b-form @submit.prevent="handleSignUp">
              <b-form-group label="Username" label-for="username">
                <b-form-input
                  id="username"
                  type="text"
                  v-model="username"
                  required
                  placeholder="Enter your username"
                ></b-form-input>
              </b-form-group>

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

              <b-form-group label="Gender" label-for="gender">
                <b-form-select
                  id="gender"
                  v-model="gender"
                  :options="genderOptions"
                  required
                ></b-form-select>
              </b-form-group>

              <b-button
                type="submit"
                variant="primary"
                class="w-100 bg-warning border-0 text-white"
              >Sign Up</b-button>

              <div class="mt-3 text-center">
                <router-link to="/LoginPage">Already have an account? Login</router-link>
              </div>
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
      genderOptions: [
        { text: 'Select Gender', value: null },
        { text: 'Male', value: 'male' },
        { text: 'Female', value: 'female' }
      ],
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
    async handleSignUp() {
      // Periksa apakah username atau email sudah digunakan
      let users = JSON.parse(localStorage.getItem('users')) || [];
      const usernameExists = users.some(user => user.username === this.username);
      const emailExists = users.some(user => user.email === this.email);

      if (usernameExists || emailExists) {
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: usernameExists ? 'Username already exists. Please choose another one.' : 'Email already exists. Please choose another one.',
        });
        return;
      }

      // Simulasi pendaftaran pengguna dengan data dummy
      const newUser = {
        username: this.username,
        email: this.email,
        password: this.password, // Simpan password untuk login nanti
        gender: this.gender,
        profilePicture: 'https://via.placeholder.com/150'
      };
      // Simpan data pengguna ke localStorage
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));

      // Tampilkan loading spinner
      Swal.fire({
        title: 'Signing up...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      // Simulasi delay untuk proses sign up
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Otomatis login setelah sign up
      this.login(newUser);

      // Update swal dengan pesan sukses
      Swal.fire({
        icon: 'success',
        title: 'Sign Up Successful',
        showConfirmButton: false,
        timer: 1500
      });

      // Arahkan pengguna ke halaman utama setelah sign up berhasil
      setTimeout(() => {
        this.$router.push({ name: 'home' });
      }, 1500);
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
