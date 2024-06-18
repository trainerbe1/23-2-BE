<template>
  <div class="about">
    <AppNavbar />
    <div class="container">
      <h1 class="text-center my-4">{{ recipe.title }}</h1>

      <!-- Display recipe image -->
      <div class="container my-4">
        <div class="d-flex flex-column justify-content-center align-items-center" style="height: auto ;">
          <span v-if="loading" class="text-muted">Loading...</span>
          <span v-else-if="error" class="text-danger">{{ error }}</span>
          <img v-else :src="recipe.image" alt="Recipe Image" class="img-fluid mb-3 recipe-image" />
        </div>
      </div>

      <!-- Recipe Details -->
      <div class="container my-4">
        <div class="row align-items-center mb-3">
          <div class="col-md-9">
            <h2 class="mb-0">{{ recipe.title }}</h2>
          </div>
          <div class="col-md-3 text-end">
            <b-button size="md" variant="warning" class="mb-2" @click="toggleFavorite">
              <b-icon :icon="isFavorite ? 'heart-fill' : 'heart'" aria-label="favorite" variant="danger"></b-icon>
            </b-button>
            <b-button size="md" variant="warning" class="mb-2 ms-2" style="margin-left: 5px;" @click="addToFavorites">
              <b-icon icon="star" aria-label="favorite"></b-icon>
            </b-button>
          </div>
        </div>
        <p class="description">{{ recipe.description }}</p>
        <h3 class="mb-2">Ingredients:</h3>
        <ul class="list-unstyled ingredients">
          <li v-for="(ingredient, index) in recipe.ingredients" :key="index">• {{ ingredient }}</li>
        </ul>
        <h3 class="mb-2">Steps:</h3>
        <ol class="steps">
          <li v-for="(step, index) in recipe.steps" :key="index">{{step}}</li>
        </ol>
      </div>

      <!-- Video Container -->
      <div class="container my-4">
        <div class="embed-responsive embed-responsive-16by9">
          <iframe v-if="recipe.video" class="embed-responsive-item" :src="recipe.video" allowfullscreen></iframe>
          <p v-else class="text-center">No video available</p>
        </div>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script>
import { recipes } from '/src/mockData';
import AppNavbar from '../components/AppNavbar.vue';
import AppFooter from '../components/AppFooter.vue';

export default {
  name: 'RecipeDetail',
  components: { AppNavbar, AppFooter },
  data() {
    return {
      loading: true,
      error: null,
      recipe: {},
      isFavorite: false // New state to track if recipe is favorite
    };
  },
  created() {
    // Fetch recipe details based on route params
    this.fetchRecipeDetails();
  },
  methods: {
    fetchRecipeDetails() {
      const recipeId = this.$route.params.id;
      const recipe = recipes.find((recipe) => recipe.id == recipeId);
      if (recipe) {
        this.recipe = recipe;
        this.loading = false;
      } else {
        this.error = 'Recipe not found';
        this.loading = false;
      }
    },
    toggleFavorite() {
      this.isFavorite = !this.isFavorite; // Toggle favorite status
    },
    addToFavorites() {
      // Implement logic to add to favorites
      alert(`Added ${this.recipe.title} to favorites`);
    }
  }
};
</script>

<style scoped>
.about {

  align-items: center;
  justify-content: center;
}
.img-fluid {
  max-width: 100%;
  height: auto;
}
.container {
  max-width: 800px;
}
.description {
  text-align: left;
  margin-bottom: 1rem;
}
.ingredients {
  text-align: left;
  list-style-type: none;
  padding: 0;
}
.ingredients li::before {
  content: '';
  color: black;
}
.recipe-image {
  width: 720px;
  height: auto;
  object-fit: cover;
  border-radius: 10px;
}
</style>
