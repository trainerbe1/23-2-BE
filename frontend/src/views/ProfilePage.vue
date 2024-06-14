<template>
  <div class="profile-page">
    <AppNavbar />
    <div
      class="profile-container d-flex align-items-center justify-content-center"
    >
      <div class="profile-card card shadow-lg p-4">
        <div class="card-body text-center">
          <b-icon icon="person-circle" font-scale="4" class="mb-3"></b-icon>
          <h3 class="card-title">
            <strong>{{ user.username }}</strong>
          </h3>
          <p class="card-text">{{ user.email }}</p>
          <div class="profile-actions mt-4">
            <b-button
              variant="outline-dark"
              class="w-100 mb-2"
              @click="goToEditProfile"
            >
              <b-icon icon="pencil"></b-icon> Edit Profile
            </b-button>
            <b-button
              variant="outline-dark"
              class="w-100 mb-2"
              @click="goToEditPassword"
            >
              <b-icon icon="lock"></b-icon> Edit Password
            </b-button>
            <b-button
              variant="outline-dark"
              class="w-100 mb-2"
              @click="goToAboutUs"
            >
              <b-icon icon="info-circle"></b-icon> About Us
            </b-button>
            <b-button
              variant="outline-dark"
              class="w-100 mb-2"
              @click="goToHelp"
            >
              <b-icon icon="question-circle"></b-icon> Help
            </b-button>
            <b-button variant="danger" class="w-100 mt-3" @click="handleLogout">
              Logout
            </b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import AppNavbar from "@/components/AppNavbar.vue";
import Swal from "sweetalert2";

export default {
  name: "ProfilePage",
  components: {
    AppNavbar,
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    ...mapActions(["logout"]),
    async handleLogout() {
      Swal.fire({
        title: "Logging out...",
        didOpen: () => {
          Swal.showLoading();
        },
      });

      // Simulate a delay for logging out
      await new Promise((resolve) => setTimeout(resolve, 2000));

      this.logout();
      Swal.close();
      this.$router.push({ name: "LoginPage" });
    },
    goToEditProfile() {
      this.$router.push({ name: "EditProfile" });
    },
    goToEditPassword() {
      this.$router.push({ name: "EditPassword" });
    },
    goToAboutUs() {
      this.$router.push({ name: "AboutUs" });
    },
    goToHelp() {
      this.$router.push({ name: "Help" });
    },
  },
};
</script>


<style scoped>
.profile-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: url("@/assets/background.jpg") no-repeat center center fixed;
  background-size: cover;
}

.profile-container {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.profile-card {
  max-width: 400px;
  width: 100%;
  border-radius: 1rem;
}

.profile-actions {
  display: flex;
  flex-direction: column;
}
</style>
