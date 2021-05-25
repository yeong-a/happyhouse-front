<template>
  <div class="row">
    <div id="map" class="map"></div>
  </div>
</template>

<script>
export default {
  mounted() {
    window.kakao && window.kakao.maps
      ? this.initMap()
      : this.addKakaoMapScript();
  },

  methods: {
    addKakaoMapScript() {
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src =
        "http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=96bb589a4d5df7cd55f2ca8c67b7c7fc&libraries=services,clusterer,drawing";
      document.head.appendChild(script);
    },
    initMap() {
      var container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
      var options = {
        //지도를 생성할 때 필요한 기본 옵션
        center: new kakao.maps.LatLng(37.56665905897916, 126.97795793013047), //지도의 중심좌표.
        level: 7, //지도의 레벨(확대, 축소 정도)
      };

      this.$data["map"] = new kakao.maps.Map(container, options); // eslint-disable-line no-unused-vars
    },
  },
};
</script>

<style>
.map {
  width: 100%;
  height: 400px;
}
</style>
