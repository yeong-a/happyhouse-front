<template>
  <b-container class="mb-5" style="max-width: 1024px">
    <nav-header></nav-header>
    <router-view></router-view>
  </b-container>
</template>

<script>
import NavHeader from "./layout/Header.vue";

export default {
  components: {
    NavHeader,
  },
  created() {
    this.$store.dispatch("mypage");
  },
};
</script>
