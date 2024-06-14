<!-- src/components/RecipeCard.vue -->
<template>
    <b-card class="mb-3 p-0 position-relative">
      <b-card-img :src="recipe.image" :alt="recipe.title" class="card-img-top"></b-card-img>
      <div class="favorite-section">
        <b-icon icon="heart-fill" variant="danger"></b-icon>
        <span class="ml-2">{{ recipe.favoriteCount }}</span>
      </div>
      <b-card-body>
        <b-card-title>{{ recipe.title }}</b-card-title>
        <b-card-sub-title class="text-muted">{{ recipe.category }}</b-card-sub-title>
        <b-button @click="viewDetails" variant="primary" class="mt-3">View Details</b-button>
      </b-card-body>
    </b-card>
  </template>
  
  <script>
  export default {
    name: 'RecipeCard',
    props: {
      recipe: Object,
    },
    methods: {
      viewDetails() {
        this.$router.push(`/recipe/${this.recipe.id}`);
      },
    },
  };
  </script>
  
  <style scoped>
  .favorite-section {
    position: absolute;
    bottom: 10px;
    right: 10px;
    display: flex;
    align-items: center;
    background: white;
    padding: 5px 10px;
    border-radius: 20px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  .favorite-section b-icon {
    color: red;
  }
  
  .ml-2 {
    margin-left: 5px;
  }
  
  .mt-3 {
    margin-top: 1rem;
  }
  
  .card-img-top {
    border-top-left-radius: calc(0.25rem - 1px);
    border-top-right-radius: calc(0.25rem - 1px);
    padding: 10px;
  }
  
  .position-relative {
    position: relative;
  }
  </style>
  