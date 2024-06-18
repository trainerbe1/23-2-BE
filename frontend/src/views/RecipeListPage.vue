<!-- src/views/RecipeListPage.vue -->
<template>
    <div>
      <AppNavbar />
      <div class="container">
        <h1>Recipe List</h1>
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
  
  export default {
    name: 'RecipeListPage',
    components: { AppNavbar, AppFooter, RecipeList },
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
  