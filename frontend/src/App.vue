<template>
  <div id="app">
    <router-view/>
  </div>
</template>


<script>

import { mapActions } from 'vuex';

export default {
  name: 'App',
  components: {

  },
  mounted() {
    this.initializeStore();
  },
  methods: {
    ...mapActions(['initializeStore'])
  }
}
</script>

<style></style>