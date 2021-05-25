<template>
  <div class="row">
    <div class="col-sm-4">
      <DetailList></DetailList>
    </div>
    <div class="col-sm-8">
      <Map></Map>
    </div>
  </div>
</template>

<script>
import DetailList from "@/components/DetailList.vue";
import Map from "@/components/Map.vue";
export default {
  name: "DetailPage",
  components: {
    Map,
    DetailList,
  },
};
</script>

<style scoped></style>
