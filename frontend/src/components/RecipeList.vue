<!-- src/components/RecipeList.vue -->
<template>
  <b-row>
    <b-col md="4" v-for="recipe in recipes" :key="recipe.id">
      <RecipeCard :recipe="recipe" />
    </b-col>
  </b-row>
</template>

<script>
import RecipeCard from './RecipeCard.vue';

export default {
  name: 'RecipeList',
  components: { RecipeCard },
  props: ['recipes'],
};
</script>

<style scoped>
</style>
