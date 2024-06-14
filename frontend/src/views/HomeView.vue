<!-- src/views/HomeView.vue -->
<template>
  <div>
    <AppNavbar />
    <HeroSection />
    <div class="container">
      <h2>For You</h2>
      <RecipeList :recipes="recipes" />
    </div>
    <AppFooter />
  </div>
</template>

<script>
import { recipes } from "/src/mockData";
import AppNavbar from '../components/AppNavbar.vue';
import AppFooter from '../components/AppFooter.vue';
import RecipeList from '../components/RecipeList.vue';
import HeroSection from '../components/Hero.vue';

export default {
  name: 'HomeView',
  components: { AppNavbar, AppFooter, RecipeList, HeroSection },
  data() {
    return {
      recipes,
    };
  },
};
</script>

<style scoped>
.container {
  padding: 20px;
}
</style>
