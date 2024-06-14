<template>
  <div>
    <AppNavbar />
    <h1>Recipe List</h1>
    <ul>
      <li v-for="recipe in recipes" :key="recipe.id">
        {{ recipe.name }}
        <button @click="addToMealPlanning(recipe)">Add to Meal Planning</button>
        <button @click="addToFavorite(recipe)">Add to Favorite</button>
      </li>
    </ul>
  </div>
</template>

<script>

import AppNavbar from "@/components/AppNavbar.vue";

export default {
  name : 'RecipeList',
  components: {
    AppNavbar,
  },
  data() {
    return {
      recipes: [
        { id: 1, name: 'Recipe 1' },
        { id: 2, name: 'Recipe 2' },
        // Tambahkan resep lainnya
      ]
    };
  },
  methods: {
    addToMealPlanning(recipe) {
      const isAuthenticated = JSON.parse(localStorage.getItem('isAuthenticated'));
      if (!isAuthenticated) {
        this.$router.push({ name: 'LoginPage' });
      } else {
        // Logika untuk menambahkan ke meal planning
        console.log(`Added ${recipe.name} to meal planning`);
      }
    },
    addToFavorite(recipe) {
      const isAuthenticated = JSON.parse(localStorage.getItem('isAuthenticated'));
      if (!isAuthenticated) {
        this.$router.push({ name: 'LoginPage' });
      } else {
        // Logika untuk menambahkan ke favorite
        console.log(`Added ${recipe.name} to favorite`);
      }
    }
  }
};
</script>
