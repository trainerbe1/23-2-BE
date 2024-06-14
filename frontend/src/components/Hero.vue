<template>
  <div class="hero-section d-flex align-items-center justify-content-center">
    <div class="col-md-8 text-center">
      <div class="search-bar">
        <b-input-group>
          <b-form-input
            type="text"
            placeholder="Search"
            aria-label="Search"
          ></b-form-input>
          <b-input-group-prepend is-text>
            <b-icon icon="search" aria-hidden="true"></b-icon>
          </b-input-group-prepend>
          <b-input-group-append is-text>
            <b-icon icon="filter" aria-hidden="true"></b-icon>
          </b-input-group-append>
        </b-input-group>
      </div>
      <h2 strong class="hero-title">
        Welcome to <strong class="brand-title">MealMastery</strong>
      </h2>
      <h5 class="title">
        Discover a world of culinary delights with MealMastery, your ultimate
        destination for delicious recipes, personalized meal plans, and a
        seamless grocery shopping experience. Whether you're a seasoned chef or
        a kitchen novice, MealMastery empowers you to create mouthwatering
        dishes with ease.
      </h5>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeroSection",
};
</script>

<style scoped>
/* Style SearchBar */
.search-bar {
  width: 100%;
  max-width: 600px;
  margin: auto;
}

.input-group-text {
  background-color: #fff;
  border: none;
}

.input-group {
  border: 1px solid #ccc;
  border-radius: 25px;
  overflow: hidden;
}

.input-group .form-control {
  border: none;
  box-shadow: none;
}

.input-group .form-control:focus {
  border: none;
  box-shadow: none;
}

.hero-section {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url("@/assets/background-hero.svg");
  background-size: cover;
}

.brand-title {
  font-family: "Pacifico", cursive;
  color: #cf7500;
}

.title {
  font-family: "Quicksand", sans-serif;
  color: aliceblue;
}
.hero-title {
  font-weight: bold;
  color: aliceblue;
}
</style>
