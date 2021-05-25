<template>
  <div>
    <SelectBox></SelectBox>
    <Map></Map>
  </div>
</template>

<script>
import SelectBox from "@/components/SelectBox.vue";
import Map from "@/components/Map.vue";
export default {
  name: "main-page",
  components: {
    SelectBox,
    Map,
  },
};
</script>

<style scoped></style>
