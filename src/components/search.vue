<template>
  <div class="row">
    <b-form-select
      style="margin-left: 30px"
      name="select"
      id="select"
      v-model="select"
      :options="select_options"
    ></b-form-select>
    <div v-if="select === '카테고리 기반 검색'">
      <b-form-select
        style="margin-left: 30px"
        name="categoty"
        id="categoty"
        v-model="category"
        text-field="text"
        :options="category_options"
      ></b-form-select>
      <b-button @click="categorySearch">카테고리 검색</b-button>
    </div>
    <div v-else-if="select === '주소 기반 검색'">
      <address-api></address-api>
    </div>
    <div v-else-if="select === '키워드 기반 검색'">
      <b-form-input
        type="text"
        v-model="keyword"
        id="keyword"
        required
      ></b-form-input>
      <b-button @click="keywordSearch">키워드 검색</b-button>
    </div>
    <h4>선택 리스트가 아래에 표시됩니다.</h4>
    <div>
      <b-table striped hover :items="selectList"></b-table>
    </div>
    <div id="map" style="width: 100%; height: 350px"></div>
  </div>
</template>

<script>
/* global kakao */
import AddressApi from "@/components/AddressAPI.vue";
export default {
  components: {
    AddressApi,
  },
  data() {
    return {
      select: "",
      category: "",
      keyword: "",
      map: null,
      ps: null,
      markers: [],
      clusterer: null,
      selectList: [],
      select_options: [
        "주소 기반 검색",
        "키워드 기반 검색",
        "카테고리 기반 검색",
      ],
      category_options: [
        { value: "MT1", text: "대형마트" },
        { value: "CS2", text: "편의점" },
        { value: "PS3", text: "어린이집" },
        { value: "SC4", text: "학교" },
        { value: "AC5", text: "학원" },
        { value: "PK6", text: "주차장" },
        { value: "OL7", text: "주유소" },
        { value: "SW8", text: "지하철역" },
        { value: "BK9", text: "은행" },
        { value: "CT1", text: "문화시설" },
        { value: "AG2", text: "중개업소" },
        { value: "PO3", text: "공공기관" },
        { value: "AT4", text: "관광명소" },
        { value: "AD5", text: "숙박" },
        { value: "FD6", text: "음식점" },
        { value: "CE7", text: "카페" },
        { value: "HP8", text: "병원" },
        { value: "PM9", text: "약국" },
      ],
    };
  },
  mounted() {
    window.kakao && window.kakao.maps
      ? this.initMap()
      : this.addKakaoMapScript();
    this.$data["clusterer"] = new kakao.maps.MarkerClusterer({
      map: this.$data["map"],
      markers: this.$data["markers"],
      gridSize: 35,
      averageCenter: true,
      minLevel: 6,
      disableClickZoom: true,
    });
    this.$data["ps"] = new kakao.maps.services.Places();
    this.$data["infowindow"] = new kakao.maps.InfoWindow({
      zIndex: 1,
    });
  },
  methods: {
    addKakaoMapScript() {
      const script = document.createElement("script");
      script.onload = () => kakao.maps.load(this.initMap);
      script.src =
        "http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=96bb589a4d5df7cd55f2ca8c67b7c7fc&libraries=services,clusterer,drawing";
      document.head.appendChild(script);
    },
    initMap() {
      var container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
      var options = {
        //지도를 생성할 때 필요한 기본 옵션
        center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
        level: 3, //지도의 레벨(확대, 축소 정도)
      };

      this.$data["map"] = new kakao.maps.Map(container, options); // eslint-disable-line no-unused-vars
    },
    selectDong(s_value) {
      var index = this.gugunoption.findIndex(function (item) {
        return item.value === s_value;
      });
      if (index == -1) {
        return [""];
      } else {
        return this.$data["dong" + index];
      }
    },
    categorySearch() {
      console.log(this.$data["category"]);
      this.$data["clusterer"].clear();
      var center = this.$data["map"].getCenter();
      this.$data["ps"].categorySearch(
        this.$data["category"],
        this.placesSearchCB,
        {
          radius: 2000,
          location: new kakao.maps.LatLng(center.getLat(), center.getLng()),
        }
      );
    },
    keywordSearch() {
      this.$data["clusterer"].clear();
      this.$data["ps"].keywordSearch(
        this.$data["keyword"],
        this.placesSearchCB
      );
    },
    placesSearchCB(
      data,
      status,
      pagination // eslint-disable-line no-unused-vars
    ) {
      if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        var bounds = new kakao.maps.LatLngBounds();

        for (var i = 0; i < data.length; i++) {
          this.displayMarker(data[i]);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        this.$data["map"].setBounds(bounds);
      }
    },
    // 지도에 마커를 표시하는 함수입니다
    displayMarker(place) {
      // 마커를 생성하고 지도에 표시합니다
      var marker = new kakao.maps.Marker({
        map: this.$data["map"],
        position: new kakao.maps.LatLng(place.y, place.x),
      });

      var content = document.createElement("div");
      var info = document.createElement("span");
      info.appendChild(document.createTextNode(place.place_name));
      content.appendChild(info);
      var selectBtn = document.createElement("button");
      selectBtn.appendChild(document.createTextNode("선택"));
      var closeBtn = document.createElement("button");
      closeBtn.appendChild(document.createTextNode("닫기"));
      //선택 이벤트
      selectBtn.onclick = () => {
        this.$data["selectList"].push({
          value: place.place_name,
          lat: overlay.getPosition().La,
          lng: overlay.getPosition().Ma,
        });
        overlay.setMap(null);
      };
      // 닫기 이벤트 추가
      closeBtn.onclick = function () {
        overlay.setMap(null);
      };
      content.appendChild(selectBtn);
      content.appendChild(closeBtn);
      let overlay = new kakao.maps.CustomOverlay({
        content: content,
        map: marker.getMap(),
        position: marker.getPosition(),
      });
      overlay.setMap(null);
      kakao.maps.event.addListener(marker, "click", function () {
        overlay.setMap(marker.getMap());
      });

      this.$data["clusterer"].addMarker(marker);
    },
  },
};
</script>
<style scoped></style>
