<template>
  <div>
    <AppNavbar />
    <b-container>
      <b-row class="mb-3 align-items-center">
        <b-col>
          <h1>Recipe List</h1>
        </b-col>
        <b-col md="3" class="text-right mt-3">
          <b-form-group label="Sort by Cuisine">
            <b-form-select v-model="selectedCuisine" @change="sortRecipes">
              <option value="">All Cuisines</option>
              <option v-for="cuisine in uniqueCuisines" :key="cuisine" :value="cuisine">{{ cuisine }}</option>
            </b-form-select>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row class="mb-3">
        <b-col>
          <b-form-input v-model="searchQuery" placeholder="Search recipes..." @input="searchRecipes"></b-form-input>
        </b-col>
      </b-row>
      <RecipeList :recipes="paginatedRecipes" />
      <b-row class="mt-3 text-warning">
        <b-col class="text-center">
          <b-pagination
            v-model="currentPage"
            :total-rows="filteredRecipes.length"
            :per-page="perPage"
            aria-controls="recipe-list"
            align="center"
          ></b-pagination>
        </b-col>
      </b-row>
    </b-container>
    <AppFooter />
  </div>
</template>

<script>
import AppNavbar from "@/components/AppNavbar.vue";
import AppFooter from "@/components/AppFooter.vue";
import RecipeList from '../components/RecipeList.vue';
import apiService from '../api/apiService';

export default {
  name: 'RecipeListPage',
  components: {
    RecipeList,
    AppNavbar,
    AppFooter
  },
  data() {
    return {
      selectedCuisine: '',
      searchQuery: '',
      currentPage: 1,
      perPage: 12,
      recipes: [],
      filteredRecipes: []
    };
  },
  computed: {
    uniqueCuisines() {
      return [...new Set(this.recipes.map(recipe => recipe.cuisine))];
    },
    paginatedRecipes() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return this.filteredRecipes.slice(start, end);
    }
  },
  methods: {
    sortRecipes() {
      this.filterAndSearchRecipes();
    },
    searchRecipes() {
      this.filterAndSearchRecipes();
    },
    filterAndSearchRecipes() {
      let recipes = this.recipes;

      if (this.selectedCuisine) {
        recipes = recipes.filter(recipe => recipe.cuisine === this.selectedCuisine);
      }

      if (this.searchQuery) {
        recipes = recipes.filter(recipe => 
          recipe.descriptions.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          recipe.instructions.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }

      this.filteredRecipes = recipes;
      this.currentPage = 1; // Reset to the first page after filtering
    },
    fetchRecipes() {
      apiService.getRecipes()
        .then(response => {
          this.recipes = response.data.data;
          this.filteredRecipes = this.recipes;
        })
        .catch(error => {
          console.error('Error fetching recipes:', error);
        });
    }
  },
  created() {
    this.fetchRecipes();
  }
};
</script>

<style scoped>
.d-flex {
  display: flex;
}

.flex-column {
  flex-direction: column;
}

.min-vh-100 {
  min-height: 100vh;
}

.flex-fill {
  flex: 1;
}
</style>
