<template>
    <div class="edit-password-page container-fluid">
      <div class="row flex-nowrap">
        <Sidebar />
        <div class="col py-3 content">
          <div class="card shadow-lg p-4">
            <div class="card-body text-center">
              <b-icon icon="person-circle" font-scale="4" class="mb-3"></b-icon>
              <h3 class="card-title"><strong>{{ user.username }}</strong></h3>
              <p class="card-text">{{ user.email }}</p>
              <b-form @submit.prevent="handleChangePassword">
                <b-form-group label="Old Password" label-for="old-password">
                  <b-form-input
                    id="old-password"
                    type="password"
                    v-model="oldPassword"
                    required
                    placeholder="Enter your old password"
                  ></b-form-input>
                </b-form-group>
  
                <b-form-group label="New Password" label-for="new-password">
                  <b-form-input
                    id="new-password"
                    type="password"
                    v-model="newPassword"
                    required
                    placeholder="Enter your new password"
                  ></b-form-input>
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
    name: "EditPassword",
    components: {
      Sidebar
    },
    data() {
      return {
        oldPassword: "",
        newPassword: ""
      };
    },
    computed: {
      ...mapState(['user'])
    },
    methods: {
      ...mapActions(['initializeStore']),
      async handleChangePassword() {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        const userIndex = users.findIndex(user => user.email === this.user.email);
        if (userIndex !== -1) {
          // Cek apakah password lama benar
          if (users[userIndex].password === this.oldPassword) {
            users[userIndex].password = this.newPassword;
            localStorage.setItem('users', JSON.stringify(users));
  
            // Tampilkan pesan sukses
            Swal.fire({
              icon: 'success',
              title: 'Password Changed Successfully',
              showConfirmButton: false,
              timer: 1500
            });
  
            this.$router.push({ name: 'ProfilePage' });
  
            // Kosongkan input password
            this.oldPassword = '';
            this.newPassword = '';
          } else {
            // Tampilkan pesan kesalahan jika password lama salah
            Swal.fire({
              icon: 'error',
              title: 'Change Password Failed',
              text: 'Old password is incorrect. Please try again.'
            });
          }
        }
      },
      cancelEdit() {
        this.$router.push({ name: 'ProfilePage' });
      }
    }
  };
  </script>
  
  <style scoped>
  .edit-password-page {
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
  