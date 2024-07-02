<!-- src/components/RecipeCard.vue -->
<template>
  <b-card class="mb-3 p-0 position-relative recipe-card" @click="viewDetails" @mouseover="hover = true" @mouseleave="hover = false">
    <div class="img-container">
      <b-card-img :src="fullImageUrl" :alt="recipe.name" class="recipe-image" />
      <div class="favorite-section">
        <b-icon icon="heart-fill" variant="danger"></b-icon>
        <span class="ml-2">{{ favoriteCount }}</span>
      </div>
    </div>
    <b-card-body>
      <b-card-title>{{ recipe.name }}</b-card-title>
      <b-card-sub-title class="text-muted">{{ recipe.cuisine }}</b-card-sub-title>
    </b-card-body>
  </b-card>
</template>

<script>
export default {
  name: 'RecipeCard',
  props: {
    recipe: Object,
  },
  data() {
    return {
      hover: false,
      favoriteCount: Math.floor(Math.random() * 1000), // Sebagai contoh favorit lokal
    };
  },
  computed: {
    fullImageUrl() {
      return `http://localhost:5000${this.recipe.recipePictureUrl}`;
    }
  },
  methods: {
    viewDetails() {
      this.$router.push(`/recipes/${this.recipe.id}`);
    },
  },
};
</script>

<style scoped>
.recipe-card {
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
}

.recipe-card:hover {
  transform: scale(1.05);
}

.img-container {
  position: relative;
  overflow: hidden;
}

.recipe-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: transform 0.2s ease-in-out;
}

.recipe-card:hover .recipe-image {
  transform: scale(1.1);
}

.favorite-section {
  position: absolute;
  bottom: 10px;
  right: 10px;
  display: flex;
  align-items: center;
  background: rgba(250, 200, 0, 0.8);
  padding: 5px 10px;
  border-radius: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.favorite-section b-icon {
  color: goldenrod;
}

.ml-2 {
  margin-left: 5px;
}

.mt-3 {
  margin-top: 1rem;
}

@media (max-width: 768px) {
  .recipe-image {
    height: 150px;
  }
}
</style>
