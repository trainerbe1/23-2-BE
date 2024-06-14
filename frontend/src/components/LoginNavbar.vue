<template>
    <b-navbar toggleable="lg" type="light" variant="warning">
      <b-container>
        <router-link class="navbar-brand" to="/">MealMastery</router-link>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item>
              <router-link to="/SignUp" class="nav-link">
                <b-button variant="dark" class="rounded-pill px-4 py-2">Sign Up</b-button>
              </router-link>
            </b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>
  </template>
  
  <script>
  export default {
    name: 'LoginNavbar'
  }
  </script>
  
  <style scoped>
  .navbar-brand {
  font-family: "Pacifico", cursive;
  font-size: 1.3rem;
}
  </style>
  