<template>
  <div id="map"></div>
</template>

<script>
/* global kakao */
export default {
  props: {
    markers: Array,
  },
  data() {
    return {
      markerRefs: [],
    };
  },
  mounted() {
    window.kakao && window.kakao.maps
      ? this.initMap()
      : this.addKakaoMapScript();
    this.showMarkers(this.markers);
  },
  methods: {
    addKakaoMapScript() {
      const script = document.createElement("script");
      script.onload = () => kakao.maps.load(this.initMap);
      script.src =
        "http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=96bb589a4d5df7cd55f2ca8c67b7c7fc&libraries=services,clusterer,drawing";
      document.body.appendChild(script);
    },
    initMap() {
      var container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
      var options = {
        //지도를 생성할 때 필요한 기본 옵션
        center: new kakao.maps.LatLng(37.56665905897916, 126.97795793013047), //지도의 중심좌표.
        level: 4, //지도의 레벨(확대, 축소 정도)
      };
      this.map = new kakao.maps.Map(container, options); // eslint-disable-line no-unused-vars
    },
    showMarkers(newMarkers) {
      this.markerRefs.forEach((marker) => marker.setMap(null));
      if (newMarkers && newMarkers.length > 0) {
        const bounds = new kakao.maps.LatLngBounds();
        newMarkers.forEach(({ lat, lng }) => {
          bounds.extend(new kakao.maps.LatLng(lat, lng));
        });
        this.map.setBounds(bounds);
        const markers = newMarkers.map(
          ({ lat, lng, content = "", onClick = () => {} }) => {
            const marker = new kakao.maps.Marker({
              position: new kakao.maps.LatLng(lat, lng),
            });
            marker.setMap(this.map);
            const infoWindow = new kakao.maps.InfoWindow({ content });
            kakao.maps.event.addListener(marker, "mouseover", () => {
              infoWindow.open(this.map, marker);
            });
            kakao.maps.event.addListener(marker, "mouseout", () => {
              infoWindow.close();
            });
            kakao.maps.event.addListener(marker, "click", () => onClick());
            return marker;
          }
        );
        this.markerRefs = markers;
      }
    },
  },
  watch: {
    markers: function (newMarkers) {
      this.showMarkers(newMarkers);
    },
  },
};
</script>

<style>
#map {
  margin: 0 auto;
  height: 500px !important;
}
</style>
