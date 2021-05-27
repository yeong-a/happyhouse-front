<template>
  <div>
    <b-tabs content-class="mt-3 mb-3" no-fade>
      <b-tab title="주소 기반 검색" active>
        <div class="d-flex">
          <b-input
            v-model="address"
            placeholder="검색할 주소를 입력해주세요."
          />
          <b-button
            variant="primary"
            class="flex-shrink-0 ml-2"
            @click="addAddress(address)"
          >
            주소 검색
          </b-button>
        </div>
      </b-tab>
      <b-tab title="키워드 기반 검색">
        <div class="d-flex">
          <b-form-input
            v-model="keyword"
            placeholder="검색할 키워드를 입력하세요."
            required
          ></b-form-input>
          <b-button
            variant="primary"
            class="flex-shrink-0 ml-2"
            @click="keywordSearch"
          >
            키워드 검색
          </b-button>
        </div>
      </b-tab>
      <b-tab title="카테고리 기반 검색">
        <div class="d-flex">
          <b-form-select
            name="categoty"
            v-model="category"
            :options="categoryOptions"
          ></b-form-select>
          <b-button
            variant="primary"
            class="flex-shrink-0 ml-2"
            @click="categorySearch"
            >카테고리 검색</b-button
          >
        </div>
      </b-tab>
    </b-tabs>
    <div>
      <b-table
        striped
        hover
        :fields="fields"
        :items="selectedPlaces"
        show-empty
        empty-text="선택된 장소가 없습니다."
      >
      </b-table>
      <div class="d-flex justify-content-between mb-3">
        <div>
          <b-button @click="drawPolygon">화면에 표시</b-button>
          <b-button variant="success" class="ml-2" @click="getRecommendedHouses"
            >매매 정보 추천받기</b-button
          >
        </div>
        <b-button variant="danger" @click="reset">초기화</b-button>
      </div>
    </div>
    <b-overlay :show="loading">
      <div id="map"></div>
    </b-overlay>
  </div>
</template>

<script>
/* global kakao */
import axios from "axios";
import http from "@/http-common";

export default {
  data() {
    return {
      loading: false,
      address: "",
      category: undefined,
      keyword: "",
      map: null,
      ps: null,
      markers: [],
      clusterer: null,
      fields: [
        {
          key: "name",
          label: "이름",
        },
        {
          key: "address",
          label: "주소",
        },
        { key: "phone", label: "전화번호" },
      ],
      selectedPlaces: [],
      categoryOptions: [
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
      polygon: null,
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
    window.ps = this.ps;
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
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(37.56665905897916, 126.97795793013047),
        level: 3,
      };
      this.$data["map"] = new kakao.maps.Map(container, options);
    },
    async addAddress(address) {
      const response = await axios.get(
        "https://dapi.kakao.com/v2/local/search/address.json",
        {
          headers: {
            Authorization: "KakaoAK 4a14862b0989308942cb45c7d31e5a92",
          },
          params: {
            query: address,
          },
        }
      );
      if (response.data.meta.total_count === 0) {
        alert("검색 결과가 없습니다.");
        return;
      }
      const bounds = new kakao.maps.LatLngBounds();
      response.data.documents.forEach(({ address_name, x, y }) => {
        this.displayMarker({
          place_name: address_name,
          address_name,
          phone: "",
          x: x,
          y: y,
        });
        bounds.extend(new kakao.maps.LatLng(y, x));
      });
      this.map.setBounds(bounds);
    },
    categorySearch() {
      this.clearMap();
      const center = this.$data["map"].getCenter();
      this.$data["ps"].categorySearch(
        this.$data["category"],
        this.placesSearchCB,
        {
          radius: 10000,
          location: new kakao.maps.LatLng(center.getLat(), center.getLng()),
        }
      );
    },
    keywordSearch() {
      this.clearMap();
      this.$data["ps"].keywordSearch(
        this.$data["keyword"],
        this.placesSearchCB
      );
    },
    placesSearchCB(data, status) {
      if (status === kakao.maps.services.Status.OK) {
        const bounds = new kakao.maps.LatLngBounds();
        for (let i = 0; i < data.length; i++) {
          this.displayMarker(data[i]);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }
        this.$data["map"].setBounds(bounds);
      }
    },
    displayMarker(place, selectable = true) {
      const marker = new kakao.maps.Marker({
        map: this.$data["map"],
        position: new kakao.maps.LatLng(place.y, place.x),
      });
      if (selectable) {
        const content = document.createElement("div");
        Object.assign(content.style, {
          padding: "8px",
          background: "white",
          marginTop: "-100px",
          border: "1px solid #777",
          borderRadius: "4px",
        });
        const info = document.createElement("span");
        info.style.marginRight = "8px";
        info.textContent = place.place_name;
        content.appendChild(info);
        const selectBtn = document.createElement("button");
        selectBtn.textContent = "선택";
        selectBtn.classList.add("btn", "btn-primary", "btn-sm");
        selectBtn.onclick = () => {
          this.selectedPlaces.push({
            name: place.place_name,
            address: place.address_name,
            phone: place.phone,
            lat: parseFloat(place.y),
            lng: parseFloat(place.x),
          });
          overlay.setMap(null);
        };
        const closeBtn = document.createElement("button");
        closeBtn.classList.add("btn", "btn-secondary", "btn-sm", "ml-1");
        closeBtn.textContent = "닫기";
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
      }
      this.clusterer.addMarker(marker);
    },
    clearMap() {
      this.clearPolygon();
      this.clearClusterer();
    },
    clearClusterer() {
      if (this.clusterer) {
        this.clusterer.clear();
      }
    },
    clearPolygon() {
      if (this.polygon) {
        this.polygon.setMap(null);
        this.polygon = null;
      }
    },
    drawPolygon() {
      this.clearPolygon();
      const polygonPath = this.selectedPlaces.map(
        ({ lat, lng }) => new kakao.maps.LatLng(lat, lng)
      );
      this.polygon = new kakao.maps.Polygon({
        path: polygonPath, // 그려질 다각형의 좌표 배열입니다
        strokeWeight: 3, // 선의 두께입니다
        strokeColor: "#39DE2A", // 선의 색깔입니다
        strokeOpacity: 0.8, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
        strokeStyle: "longdash", // 선의 스타일입니다
        fillColor: "#A2FF99", // 채우기 색깔입니다
        fillOpacity: 0.7, // 채우기 불투명도 입니다
      });
      this.polygon.setMap(this.map);
    },
    reset() {
      this.selectedPlaces = [];
      this.clearMap();
    },
    async getRecommendedHouses() {
      const center = this.selectedPlaces.reduce(
        (sum, { lat, lng }) => ({
          lat: sum.lat + parseFloat(lat),
          lng: sum.lng + parseFloat(lng),
        }),
        {
          lat: 0,
          lng: 0,
        }
      );
      center.lat /= this.selectedPlaces.length;
      center.lng /= this.selectedPlaces.length;
      this.loading = true;
      const response = await http.get("/happyhouse/house/search-around", {
        params: {
          lat: center.lat,
          lng: center.lng,
          distance: 1000,
        },
      });
      this.loading = false;
      this.clearClusterer();
      response.data.result.forEach(({ aptName, lat, lng }) => {
        this.displayMarker(
          {
            place_name: aptName,
            x: lng,
            y: lat,
          },
          false
        );
      });
    },
  },
};
</script>
