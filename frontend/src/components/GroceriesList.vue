<template>
    <div>
      <groceries-card
        v-for="recipe in groceries"
        :key="recipe.id"
        :recipe="recipe"
        @clear-meal="clearMeal"
      ></groceries-card>
    </div>
  </template>
  
  <script>
  import GroceriesCard from './GroceriesCard.vue';
  
  export default {
    name: 'GroceriesList',
    components: { GroceriesCard },
    props: {
      groceries: {
        type: Array,
        required: true
      }
    },
    methods: {
      clearMeal(recipeId) {
        this.$emit('clear-meal', recipeId);
      }
    }
  };
  </script>
  