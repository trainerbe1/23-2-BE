<template>
    <div>
      <favorite-card
        v-for="recipe in favorites"
        :key="recipe.id"
        :recipe="recipe"
        @remove-favorite="removeFavorite"
      ></favorite-card>
    </div>
  </template>
  
  <script>
  import FavoriteCard from './FavoriteCard.vue';
  
  export default {
    name: 'FavoriteList',
    components: { FavoriteCard },
    props: {
      favorites: {
        type: Array,
        required: true
      }
    },
    methods: {
      removeFavorite(recipeId) {
        this.$emit('remove-favorite', recipeId);
      }
    }
  };
  </script>
  