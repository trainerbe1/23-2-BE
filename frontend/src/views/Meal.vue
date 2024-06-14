<template>
  <div>
    <AppNavbar />
    <h2>INI ADALAH MEAL PLANNING COY</h2>
    <AppFooter />
  </div>
</template>

<script>
import AppNavbar from "@/components/AppNavbar.vue";
import AppFooter from "@/components/AppFooter.vue";

export default {
  name: "MealPlanning",
  components: {
    AppNavbar,
    AppFooter,
  },
};
</script>

<style>
</style>