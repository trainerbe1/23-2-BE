<template>
  <div class="d-flex flex-column min-vh-100">
    <AppNavbar />
    <HeroSection />
    <div class="container">
      <h2>Isi card recipe</h2>
    </div>
    <AppFooter />
  </div>
</template>

<script>
// @ is an alias to /src
import AppNavbar from "@/components/AppNavbar.vue";
import AppFooter from "@/components/AppFooter.vue";
import HeroSection from "@/components/Hero.vue";

export default {
  name: "HomeView",
  components: {
    AppNavbar,
    AppFooter,
    HeroSection,
  },
};
</script>
