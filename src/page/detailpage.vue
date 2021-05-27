<template>
  <div class="row">
    <div class="col-sm-4">
      <DetailList></DetailList>
    </div>
    <div class="col-sm-8">
      <SelectBox></SelectBox>
      <Map></Map>
    </div>
  </div>
</template>

<script>
import SelectBox from "@/components/SelectBox.vue";
import DetailList from "@/components/DetailList.vue";
import Map from "@/components/Map.vue";
export default {
  name: "DetailPage",
  components: {
    Map,
    DetailList,
    SelectBox,
  },
};
</script>

<style scoped></style>
