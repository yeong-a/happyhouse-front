<template>
  <div>
    <b-form-select v-model="menu" :options="searchOption">
      <template #first>
        <b-form-select-option :value="null" disabled
          >검색 옵션을 선택해주세요</b-form-select-option
        >
      </template>
    </b-form-select>
    <div v-if="menu == '동 검색'" style="text-align: center">
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
    <div v-if="menu == '아파트 이름 검색'" style="text-align: center">
      <b-form-input
        v-model="apartName"
        placeholder="아파트 이름을 입력해주세요"
      ></b-form-input>
      <b-button>검색</b-button>
    </div>
  </div>
</template>

<script>
import { gugunOptions } from "@/consts";

export default {
  data() {
    return {
      searchOption: ["동 검색", "아파트 이름 검색"],
      menu: null,
      apartName: "",
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
