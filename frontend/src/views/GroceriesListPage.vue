<template>
  <div>
    <AppNavbar />
    <b-container>
      <div class="d-flex justify-content-between align-items-center my-4">
        <h1>Groceries List</h1>
        <b-button variant="danger" @click="clearAllGroceries">Clear All Groceries</b-button>
      </div>
      <groceries-list :groceries="groceries" @clear-meal="clearMeal"></groceries-list>
    </b-container>
    <AppFooter />
  </div>
</template>

<script>
import AppNavbar from '@/components/AppNavbar.vue';
import AppFooter from '@/components/AppFooter.vue';
import GroceriesList from '@/components/GroceriesList.vue';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'GroceriesListPage',
  components: { AppNavbar, AppFooter, GroceriesList },
  computed: {
    ...mapState(['groceries']),
  },
  methods: {
    ...mapActions(['clearMeal', 'clearAllGroceries']),
    clearMeal(recipeId) {
      this.$store.dispatch('clearMeal', recipeId);
    },
    clearAllGroceries() {
      this.$store.dispatch('clearAllGroceries');
    }
  }
};
</script>

<style scoped>
.my-4 {
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
}
</style>
