<template>
  <div>
    <b-table :items="items" :fields="fields" sticky-header="400px">
      <template #cell(dealDate)="data">
        {{ data.item.dealYear }}/{{ data.item.dealMonth.padStart(2, "0") }}/{{
          data.item.dealDay.padStart(2, "0")
        }}
      </template>
    </b-table>
  </div>
</template>

<script>
import http from "@/http-common";
export default {
  data() {
    return {
      items: [],
      fields: [
        {
          key: "no",
          label: "매물번호",
        },
        {
          key: "dong",
          label: "동",
        },
        {
          key: "aptName",
          label: "이름",
        },
        {
          key: "dealAmount",
          label: "매매가",
        },
        {
          key: "dealDate",
          label: "매매일",
        },
        {
          key: "floor",
          label: "층",
        },
        {
          key: "area",
          label: "면적",
          formatter: (value) => value + "㎡",
        },
      ],
    };
  },
  async created() {
    const response = await http.get(
      `/happyhouse/house/detail?aptName=${this.$route.query.aptName}`
    );
    this.items = response.data.result;
  },
};
</script>

<style scoped></style>
