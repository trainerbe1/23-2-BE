<template>
    <div>
      <favorite-card
        v-for="recipe in favorites"
        :key="recipe.id"
        :item="recipe"
        @add-groceries="addGroceries"
        @delete-item="deleteItem"
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
      addGroceries(item) {
        this.$emit('add-groceries', item);
      },
      deleteItem(recipeId) {
        this.$emit('delete-item', recipeId);
      }
    }
  };
  </script>
  