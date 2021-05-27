<template>
  <b-container>
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
