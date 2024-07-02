<template>
  <div>
    <AppNavbar />
    <b-container>
      <div class="d-flex justify-content-between align-items-center my-4">
        <h1>Favorite Recipes</h1>
        <b-button variant="danger" @click="clearAllFavorites">Clear All Favorites</b-button>
      </div>
      <favorite-list :favorites="favorites" @remove-favorite="removeFavorite"></favorite-list>
    </b-container>
    <AppFooter />
  </div>
</template>

<script>
import AppNavbar from '@/components/AppNavbar.vue';
import AppFooter from '@/components/AppFooter.vue';
import FavoriteList from '@/components/FavoriteList.vue';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'FavoriteListPage',
  components: { AppNavbar, AppFooter, FavoriteList },
  computed: {
    ...mapState(['favorites']),
  },
  methods: {
    ...mapActions(['removeFavorite', 'clearAllFavorites']),
    removeFavorite(recipeId) {
      this.$store.dispatch('removeFavorite', recipeId);
    },
    clearAllFavorites() {
      this.$store.dispatch('clearAllFavorites');
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
