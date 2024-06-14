<template>
  <b-navbar toggleable="lg" type="light" variant="warning">
    <b-container>
      <router-link class="navbar-brand" to="/">MealMastery</router-link>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item-dropdown text="Recipes" right>
            <b-dropdown-item href="/RecipeList">Recipe List</b-dropdown-item>
            <b-dropdown-item href="#/category">Category</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item href="/MealPlanning">Meal</b-nav-item>
          <b-nav-item href="/FavoritePage">Favorite</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <template v-if="!isAuthenticated">
            <b-nav-item>
              <router-link to="/LoginPage" class="nav-link">
                <b-button
                  variant="outline-dark"
                  class="rounded-pill px-4 py-custom"
                  >Login</b-button
                >
              </router-link>
            </b-nav-item>
            <b-nav-item>
              <router-link to="/SignUp" class="nav-link">
                <b-button variant="dark" class="rounded-pill px-4 py-custom"
                  >Sign Up</b-button
                >
              </router-link>
            </b-nav-item>
          </template>
          <template v-else>
            <b-nav-item-dropdown right>
              <template #button-content>
                <b-icon icon="person-circle" font-scale="1.8"></b-icon>
              </template>
              <b-dropdown-item to="/ProfilePage">Profile</b-dropdown-item>
              <b-dropdown-item @click="handleLogout">Logout</b-dropdown-item>
            </b-nav-item-dropdown>
          </template>
        </b-navbar-nav>
      </b-collapse>
    </b-container>
  </b-navbar>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Swal from 'sweetalert2';

export default {
  name: 'AppNavbar',
  computed: {
    ...mapState(["isAuthenticated", "user"]),
  },
  methods: {
    ...mapActions(["logout"]),
    handleLogout() {
      Swal.fire({
        title: 'Logging out...',
        didOpen: () => {
          Swal.showLoading();
        },
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false
      });
      
      setTimeout(() => {
        this.logout();
        this.$router.push({ name: 'LoginPage' });
        Swal.close();
      }, 1500); // Simulate a delay for the logout process
    }
  },
};
</script>



  <style scoped>
.navbar-brand {
  font-family: "Pacifico", cursive;
  font-size: 1.3rem;
}

.py-custom {
  padding-top: 0.45rem;
  padding-bottom: 0.45rem;
}
</style>