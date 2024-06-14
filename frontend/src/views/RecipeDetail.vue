<template>
    <div>
      <h1>Recipe</h1>

      <!-- Header -->
      
      <!-- Search Bar -->
      <div class="container my-4">
        <div class="input-group">
          <input type="text" class="form-control" placeholder="Search" />
          <button class="btn btn-warning" type="button">Search</button>
        </div>
      </div>

      <!-- Product Image -->
      <div class="container my-4">
        <div class="bg-light d-flex flex-column justify-content-center align-items-center" style="height: 400px;">
          <span v-if="loading" class="text-muted">Loading...</span>
          <span v-else-if="error" class="text-danger">{{ error }}</span>
          <img v-else :src="productImage" alt="Product Image" class="img-fluid mb-3" />
          <div class="d-flex align-items-center mb-3">
            <span class="fs-3 me-2">
              <i class="fas fa-heart text-danger"></i> <!-- Icon love -->
            </span>
            <h2 class="text-center mb-0">{{ productName }}</h2>
            <span class="fs-3 ms-2">
              <i class="fas fa-star text-warning"></i> <!-- Icon favorite -->
            </span>
          </div>
          <p class="text-center">{{ productDescription }}</p>
          <h3 class="text-center mb-2">Ingredients:</h3>
          <ul class="list-group text-center" v-if="productIngredients.length > 0">
            <li class="list-group-item" v-for="(ingredient, index) in productIngredients" :key="index">{{ ingredient }}</li>
          </ul>
          <p v-else class="text-center">No ingredients available</p>
        </div>
      </div>

      <!-- Video Container -->
      <div class="container my-4">
        <div class="embed-responsive embed-responsive-16by9" v-if="videoUrl">
          <iframe class="embed-responsive-item" :src="videoUrl" allowfullscreen></iframe>
        </div>
        <p v-else class="text-center">No video available</p>
      </div>

      <!-- Other Products Container -->
      <div class="container my-4">
        <div class="row">
          <div class="col-md-4" v-for="product in otherProducts" :key="product.id">
            <div class="card mb-4">
              <img :src="product.image" class="card-img-top" alt="Product Image">
              <div class="card-body">
                <h5 class="card-title">{{ product.name }}</h5>
                <p class="card-text">{{ product.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
  </template>

  <script>
  import axios from 'axios';
  export default {
    name: 'RecipeDetail',
    data() {
      return {
        loading: true,
        error: null,
        productImage: '',
        productName: '',
        productDescription: '',
        productIngredients: [],
        videoUrl: '',
        otherProducts: []
      };
    },
    created() {
      this.fetchProductData();
      this.fetchVideoData();
      this.fetchOtherProducts();
    },
    methods: {
      async fetchProductData() {
        try {
          const response = await axios.get('http://localhost:3000/api/product'); // Ganti dengan URL API yang sesuai
          this.productImage = response.data.image; // Asumsikan API mengembalikan URL gambar dalam field `image`
          this.productName = response.data.name; // Asumsikan API mengembalikan nama produk dalam field `name`
          this.productDescription = response.data.description; // Asumsikan API mengembalikan deskripsi produk dalam field `description`
          this.productIngredients = response.data.ingredients; // Asumsikan API mengembalikan daftar bahan dalam array `ingredients`
        } catch (error) {
          this.error = 'Failed to load product data';
        } finally {
          this.loading = false;
        }
      },
      async fetchVideoData() {
        try {
          const response = await axios.get('http://localhost:3000/api/video'); // Ganti dengan URL API yang sesuai
          this.videoUrl = response.data.url; // Asumsikan API mengembalikan URL video dalam field `url`
        } catch (error) {
          this.error = 'Failed to load video data';
        }
      },
      async fetchOtherProducts() {
        try {
          const response = await axios.get('https://api.example.com/products'); // Ganti dengan URL API yang sesuai
          this.otherProducts = response.data.slice(0, 3); // Asumsikan API mengembalikan daftar produk dalam array `data`, dan kita ambil 3 produk pertama
        } catch (error) {
          this.error = 'Failed to load other products';
        }
      }
    },
  };
  </script>

<style>

</style>