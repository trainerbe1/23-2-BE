<template>
  <div class="home-container">
    <AppNavbar />
    <HeroSection />
    <div class="container">
      <RecipeList />
    </div>
    <AboutUs />
    <AppFooter />
  </div>
</template>

<script>
import AppNavbar from '@/components/AppNavbar.vue';
import RecipeList from '@/components/RecipeList.vue';
import AppFooter from '@/components/AppFooter.vue';
import HeroSection from '@/components/Hero.vue';
import AboutUs from '@/components/AboutUs.vue';


export default {
  name: 'HomeView',
  components:{
    AppNavbar,
    RecipeList,
    AboutUs,
    AppFooter,
    HeroSection
  },
  
};
</script>

<style scoped>
.home-container {
  text-align: center;
}
</style>
