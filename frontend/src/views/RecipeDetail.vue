<template>
  <div class="about">
    <AppNavbar />
    <div class="container">
      <h1 class="text-center my-4">{{ recipe.name }}</h1>

      <!-- Display recipe image -->
      <div class="container my-4">
        <div class="d-flex flex-column justify-content-center align-items-center" style="height: auto;">
          <span v-if="loading" class="text-muted">Loading...</span>
          <span v-else-if="error" class="text-danger">{{ error }}</span>
          <img v-else :src="fullImageUrl" alt="Recipe Image" class="img-fluid mb-3 recipe-image" />
        </div>
      </div>

      <!-- Recipe Details -->
      <div class="container my-4">
        <div class="row align-items-center mb-3">
          <div class="col-md-9">
            <h2 class="mb-0">{{ recipe.name }}</h2>
          </div>
          <div class="col-md-3 text-end">
            <b-button size="md" variant="warning" class="mb-2" @click="handleFavorite">
              <b-icon :icon="isFavorite ? 'heart-fill' : 'heart'" aria-label="favorite" variant="danger"></b-icon>
            </b-button>
            <b-button size="md" variant="warning" class="mb-2 ms-2" style="margin-left: 5px;" @click="handleGroceries">
              <b-icon :icon="isInGroceries ? 'bookmark-fill' : 'bookmark'" aria-label="groceries"></b-icon>
            </b-button>
          </div>
        </div>
        <p class="description">{{ recipe.descriptions }}</p>
        <h3 class="mb-2">Ingredients:</h3>
        <ul class="list-unstyled ingredients">
          <li v-for="(ingredient, index) in recipe.ingredients" :key="index">• {{ ingredient.quantity }} {{ ingredient.unit }} {{ ingredient.name }}</li>
        </ul>
        <h3 class="mb-2">Steps:</h3>
        <ol class="steps">
          <li v-for="(instruction, index) in recipe.instructions.split(', ')" :key="index">{{ instruction }}</li>
        </ol>
      </div>

      <!-- Video Container -->
      <div class="container my-4">
        <div class="embed-responsive embed-responsive-16by9">
          <iframe v-if="recipe.link" class="embed-responsive-item" :src="recipe.link" allowfullscreen></iframe>
          <p v-else class="text-center">No video available</p>
        </div>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script>
import apiService from '../api/apiService';
import AppNavbar from '../components/AppNavbar.vue';
import AppFooter from '../components/AppFooter.vue';
import { mapState, mapActions } from 'vuex';
import Swal from 'sweetalert2';

export default {
  name: 'RecipeDetail',
  components: { AppNavbar, AppFooter },
  data() {
    return {
      loading: true,
      error: null,
      recipe: {},
    };
  },
  computed: {
    ...mapState({
      favorites: state => state.favorites,
      groceries: state => state.groceries,
      isAuthenticated: state => state.isAuthenticated,
    }),
    isFavorite() {
      return this.favorites.includes(this.recipe.id);
    },
    isInGroceries() {
      return this.groceries.includes(this.recipe.id);
    },
    fullImageUrl() {
      return `http://localhost:5000${this.recipe.recipePictureUrl}`;
    }
  },
  created() {
    this.fetchRecipeDetails();
  },
  methods: {
    ...mapActions(['toggleFavorite', 'toggleGroceries']),
    async fetchRecipeDetails() {
      const recipeId = this.$route.params.id;
      try {
        const response = await apiService.getRecipeById(recipeId);
        console.log(response.data); // Debugging: Cek respons dari API
        this.recipe = response.data.data; // Akses data dengan benar
        this.loading = false;
      } catch (error) {
        console.error('Error fetching recipe details:', error); // Debugging: Cek kesalahan
        this.error = 'Recipe not found';
        this.loading = false;
      }
    },
    async handleFavorite() {
      if (!this.isAuthenticated) {
        Swal.fire({
          title: 'Error',
          text: 'You need to login to add to favorites',
          icon: 'error',
        });
      } else {
        await this.$store.dispatch('toggleFavorite', this.recipe.id);
        Swal.fire({
          title: 'Success',
          text: `Recipe has been ${this.isFavorite ? 'added to' : 'removed from'} favorites`,
          icon: 'success',
        });
      }
    },
    async handleGroceries() {
      if (!this.isAuthenticated) {
        Swal.fire({
          title: 'Error',
          text: 'You need to login to add to groceries',
          icon: 'error',
        });
      } else {
        await this.$store.dispatch('toggleGroceries', this.recipe.id);
        Swal.fire({
          title: 'Success',
          text: `Recipe has been ${this.isInGroceries ? 'added to' : 'removed from'} groceries`,
          icon: 'success',
        });
      }
    }
  },
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
