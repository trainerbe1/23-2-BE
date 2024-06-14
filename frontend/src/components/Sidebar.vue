<template>
    <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-warning">
      <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
        <a class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
          <span class="fs-5 d-none d-sm-inline">Profile</span>
        </a>
        <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
          <li class="nav-item">
            <router-link class="nav-link align-middle px-0" to="/EditProfile">
              <b-icon icon="pencil" class="mr-2"></b-icon> <span class="ms-1 d-none d-sm-inline">Edit Profile</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link align-middle px-0" to="/EditPassword">
              <b-icon icon="lock" class="mr-2"></b-icon> <span class="ms-1 d-none d-sm-inline">Edit Password</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link align-middle px-0" to="/Help">
              <b-icon icon="question-circle" class="mr-2"></b-icon> <span class="ms-1 d-none d-sm-inline">Help</span>
            </router-link>
          </li>
        </ul>
        <hr>
        <div class="dropdown pb-4">
          <a href="/ProfilePage" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
            <b-icon icon="person-circle" class="rounded-circle" font-scale="1.5"></b-icon>
            <span class="d-none d-sm-inline mx-1">{{ user.username }}</span>
          </a>
        </div>
      </div>
    </div>
  </template>
  
  
<script>
import { mapState, mapActions } from 'vuex';
import { BIcon } from 'bootstrap-vue';

export default {
  name: "SideBar",
  components: {
    'b-icon': BIcon
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    ...mapActions(['logout']),
    handleLogout() {
      this.logout();
      this.$router.push({ name: 'LoginPage' });
    }
  }
};
</script>
  
  <style scoped>
  .sidebar {
    background-color: #ffc107;
  }
  
  .dropdown-toggle::after {
    display: none;
  }
  
  .nav-link {
    color: white;
  }
  
  .nav-link:hover {
    color: #ffd54f;
  }
  </style>
  