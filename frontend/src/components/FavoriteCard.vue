<template>
    <b-card class="mb-3">
      <div class="d-flex justify-content-between align-items-start">
        <div class="d-flex">
          <b-img src="https://via.placeholder.com/100" alt="Product Image" class="mr-3" thumbnail></b-img>
          <div>
            <h5>{{ recipe.name }}</h5>
            <p>{{ recipe.descriptions }}</p>
          </div>
        </div>
        <b-dropdown right>
          <template v-slot:button-content>
            <b-icon icon="three-dots-vertical"></b-icon>
          </template>
          <b-dropdown-item @click="removeFavorite">
            <b-icon icon="trash" class="mr-2"></b-icon> Remove from Favorites
          </b-dropdown-item>
        </b-dropdown>
      </div>
      <ul class="list-unstyled mt-3">
        <li v-for="(ingredient, index) in recipe.ingredients" :key="index">
          <b-form-checkbox>{{ ingredient.quantity }} {{ ingredient.unit }} {{ ingredient.name }}</b-form-checkbox>
        </li>
      </ul>
    </b-card>
  </template>
  
  <script>
  export default {
    name: 'FavoriteCard',
    props: {
      recipe: {
        type: Object,
        required: true
      }
    },
    methods: {
      removeFavorite() {
        this.$emit('remove-favorite', this.recipe.id);
      }
    }
  };
  </script>
  
  <style scoped>
  .mr-3 {
    margin-right: 1rem;
  }
  </style>
  