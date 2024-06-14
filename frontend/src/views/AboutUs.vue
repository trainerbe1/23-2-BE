<template>
    <div class="about-us-page">
      <AppNavbar />
      <div class="about-us-header text-center py-5">
        <h1 class="display-4">About Us</h1>
        <p class="lead">Learn more about MealMastery and our mission</p>
      </div>
      <div class="about-us-container">
        <div class="about-us-content container my-5">
          <div class="row">
            <div class="col-md-6">
              <h2>Our Mission</h2>
              <p>
                At MealMastery, our mission is to make meal planning easy and fun for everyone. We believe that cooking should be an enjoyable experience, and our app is designed to help you create delicious meals with ease.
              </p>
            </div>
            <div class="col-md-6">
              <img src="@/assets/Mission.png" class="img-fluid" alt="Our Mission">
            </div>
          </div>
          <div class="row my-5">
            <div class="col-md-6 order-md-2">
              <h2>Our Team</h2>
              <p>
                We are a team of passionate food enthusiasts and tech experts dedicated to helping you in your culinary journey. Whether you're a beginner cook or a seasoned chef, MealMastery has something for everyone.
              </p>
            </div>
            <div class="col-md-6 order-md-1">
              <img src="@/assets/Team.png" class="img-fluid" alt="Our Team">
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <h2>Contact Us</h2>
              <p>
                Have any questions or feedback? Feel free to reach out to us at <a href="mailto:support@mealmastery.com">support@mealmastery.com</a>. We would love to hear from you!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import AppNavbar from '@/components/AppNavbar.vue';
  
  export default {
    name: "AboutUs",
    components: {
      AppNavbar
    }
  };
  </script>
  
  <style scoped>
  .about-us-page {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  
  .about-us-container {
    flex-grow: 1;
    background-color: #f8f9fa;
    padding: 20px;
  }
  
  .about-us-header {
    background-color: #ffc107;
    color: white;
  }
  
  .about-us-content {
    max-width: 1200px;
  }
  
  .lead {
    font-size: 1.25rem;
  }
  
  .img-fluid {
    border-radius: 1rem;
  }
  </style>
  