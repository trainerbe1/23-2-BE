<template>
    <div class="edit-profile-page container-fluid">
      <div class="row flex-nowrap">
        <Sidebar />
        <div class="col py-3 content">
          <div class="card shadow-lg p-4">
            <div class="card-body text-center">
              <b-icon icon="person-circle" font-scale="4" class="mb-3"></b-icon>
              <h3 class="card-title"><strong>{{ user.username }}</strong></h3>
              <p class="card-text">{{ user.email }}</p>
              <b-form @submit.prevent="handleUpdateProfile">
                <b-form-group label="Username" label-for="username">
                  <b-form-input
                    id="username"
                    type="text"
                    v-model="username"
                    required
                    placeholder="Input Username"
                  ></b-form-input>
                </b-form-group>
  
                <b-form-group label="Email address" label-for="email">
                  <b-form-input
                    id="email"
                    type="email"
                    v-model="email"
                    required
                    placeholder="email@gmail.com"
                  ></b-form-input>
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
                >Update</b-button>
                <b-button
                  variant="outline-secondary"
                  class="w-100 mt-2"
                  @click="cancelEdit"
                >Cancel</b-button>
              </b-form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapState, mapActions } from 'vuex';
  import Sidebar from '@/components/Sidebar.vue';
  import Swal from 'sweetalert2';
  
  export default {
    name: "EditProfile",
    components: {
      Sidebar
    },
    data() {
      return {
        username: "",
        email: "",
        gender: "",
        genderOptions: [
          { text: 'Select Gender', value: null },
          { text: 'Male', value: 'male' },
          { text: 'Female', value: 'female' }
        ]
      };
    },
    computed: {
      ...mapState(['user'])
    },
    created() {
      this.loadUserProfile();
    },
    methods: {
      ...mapActions(['initializeStore', 'updateUser']),
      loadUserProfile() {
        if (this.user) {
          this.username = this.user.username;
          this.email = this.user.email;
          this.gender = this.user.gender;
        }
      },
      async handleUpdateProfile() {
        const updatedUser = {
          username: this.username,
          email: this.email,
          gender: this.gender
        };
  
        try {
          // Simulasi request dengan delay
          await new Promise(resolve => setTimeout(resolve, 1000));
  
          // Update data pengguna di localStorage
          let users = JSON.parse(localStorage.getItem('users')) || [];
          const userIndex = users.findIndex(user => user.email === this.user.email);
          if (userIndex !== -1) {
            users[userIndex] = { ...users[userIndex], ...updatedUser };
            localStorage.setItem('users', JSON.stringify(users));
            
            // Perbarui data pengguna di Vuex store
            this.updateUser(updatedUser);
  
            // Tampilkan pesan sukses
            Swal.fire({
              icon: 'success',
              title: 'Profile Updated Successfully',
              showConfirmButton: false,
              timer: 1500
            });
  
            this.$router.push({ name: 'ProfilePage' });
          }
        } catch (error) {
          // Tangani kesalahan
          Swal.fire({
            icon: 'error',
            title: 'Update Failed',
            text: 'There was an error updating your profile. Please try again.'
          });
        }
      },
      cancelEdit() {
        this.$router.push({ name: 'ProfilePage' });
      }
    }
  };
  </script>
  
  <style scoped>
  .edit-profile-page {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  
  .content {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .card {
    width: 100%;
    max-width: 500px;
    margin: auto;
  }
  </style>
  