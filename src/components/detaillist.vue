<template>
  <div>
    <b-table
      hover
      :items="items"
      :fields="fields"
      sticky-header="600px"
      show-empty
      empty-text="검색된 매물이 없습니다."
    >
      <template #cell(aptName)="data">
        <router-link :to="`/house?aptName=${data.item.aptName}`">
          {{ data.item.aptName }}
        </router-link>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  props: {
    items: Array,
  },
  data() {
    return {
      fields: [
        {
          key: "dong",
          label: "동",
        },
        {
          key: "aptName",
          label: "이름",
        },
        {
          key: "jibun",
          label: "지번주소",
        },
      ],
    };
  },
};
</script>

<style scoped></style>
