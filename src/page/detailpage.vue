<template>
  <div class="row">
    <div class="col-sm-4">
      <DetailList :items="items" />
    </div>
    <div class="col-sm-8">
      <div style="text-align: center">
        <b-form-select
          style="margin-left: 30px"
          name="sido"
          id="sido"
          v-model="sido"
          text-field="value"
          :options="sidoOptions"
        ></b-form-select>
        <b-form-select
          style="margin-left: 30px"
          name="gugun"
          id="gugun"
          text-field="value"
          v-model="gugun"
          :options="gugunOptions"
        ></b-form-select>
        <b-form-select
          style="margin-left: 30px"
          name="dong"
          id="dong"
          v-model="dong"
          text-field="value"
          :options="dongOptions"
        ></b-form-select>
        <b-button style="margin-left: 30px" @click="getHousesByDong"
          >매물 표시</b-button
        >
      </div>
      <Map :markers="markers"></Map>
    </div>
  </div>
</template>

<script>
import DetailList from "@/components/DetailList.vue";
import Map from "@/components/Map.vue";
import { gugunOptions } from "@/consts";
import http from "@/http-common";

export default {
  name: "DetailPage",
  components: {
    Map,
    DetailList,
  },
  data() {
    return {
      sido: "서울특별시",
      gugun: "종로구",
      dong: null,
      items: [],
      markers: [],
    };
  },
  computed: {
    sidoOptions() {
      return Object.keys(gugunOptions);
    },
    gugunOptions() {
      return this.sido && Object.keys(gugunOptions[this.sido]);
    },
    dongOptions() {
      return this.gugun && Object.values(gugunOptions[this.sido][this.gugun]);
    },
  },
  watch: {
    gugun: function () {
      this.dong = this.dongOptions[0];
    },
  },
  methods: {
    async getHousesByDong() {
      const response = await http.get(
        `happyhouse/house/search?dong=${this.dong}`
      );
      this.items = response.data.result;
      this.markers = this.items.map(({ aptName, lat, lng }) => ({
        lat: parseFloat(lat),
        lng: parseFloat(lng),
        content: `<div style='padding: 5px'>${aptName}</div>`,
        onClick: () => this.$router.push(`/house?aptName=${aptName}`),
      }));
    },
  },
};
</script>

<style scoped></style>
