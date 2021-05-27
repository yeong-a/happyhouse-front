<template>
  <div>
    <b-jumbotron
      header="Happy House"
      lead="원하는 집을 찾는 가장 쉬운 방법"
      text-variant="white"
      :style="`padding: 12rem 2rem; background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImageURL})`"
    >
      <p>다양한 추천 기능들을 사용해 지금 바로 당신이 찾던 집을 만나보세요.</p>
      <router-link to="/search" v-slot="{ href, navigate }">
        <b-button variant="primary" :href="href" @click="navigate">
          검색 페이지로
        </b-button>
      </router-link>
    </b-jumbotron>
  </div>
</template>

<script>
import Background from "@/assets/background.jpg";

export default {
  data() {
    return {
      slide: 0,
      sliding: null,
      backgroundImageURL: Background,
    };
  },
  methods: {
    onSlideStart() {
      this.sliding = true;
    },
    onSlideEnd() {
      this.sliding = false;
    },
  },
};
</script>
