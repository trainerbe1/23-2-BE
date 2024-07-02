<template>
  <b-navbar toggleable="lg" type="light" variant="warning">
    <b-container>
      <router-link class="navbar-brand" to="/">MealMastery</router-link>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/recipes">Recipes</b-nav-item>
          <b-nav-item to="/groceries">Groceries</b-nav-item>
          <b-nav-item to="/favorite">Favorite</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <template v-if="!isAuthenticated">
            <b-nav-item>
              <router-link to="/login" class="nav-link">
                <b-button variant="outline-dark" class="rounded-pill px-4 py-custom">Login</b-button>
              </router-link>
            </b-nav-item>
            <b-nav-item>
              <router-link to="/signup" class="nav-link">
                <b-button variant="dark" class="rounded-pill px-4 py-custom">Sign Up</b-button>
              </router-link>
            </b-nav-item>
          </template>
          <template v-else>
            <b-nav-item-dropdown right>
              <template v-slot:button-content>
                <b-icon icon="person-circle"></b-icon>
              </template>
              <b-dropdown-item @click="goToProfile">Profile</b-dropdown-item>
              <b-dropdown-item @click="logout">Logout</b-dropdown-item>
            </b-nav-item-dropdown>
          </template>
        </b-navbar-nav>
      </b-collapse>
    </b-container>
  </b-navbar>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'AppNavbar',
  components: {
  },
  computed: {
    ...mapState({
      isAuthenticated: state => state.isAuthenticated,
    }),
  },
  methods: {
    ...mapActions(['logout', 'fetchUserById']),
    async goToProfile() {
      const userId = this.$store.state.userId;
      await this.fetchUserById(userId);
      this.$router.push('/profile');
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
