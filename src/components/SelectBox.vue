<template>
  <div>
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
      <b-button style="margin-left: 30px">매물 표시</b-button>
    </div>
  </div>
</template>

<script>
import { gugunOptions } from "@/consts";

export default {
  data() {
    return {
      sido: "서울특별시",
      gugun: "종로구",
      dong: null,
      map: null,
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
};
</script>

<style scoped></style>
