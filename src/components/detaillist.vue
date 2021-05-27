<template>
  <div>
    <b-table :items="items" :fields="fields" caption-top> </b-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fields: ["first_name", "last_name", "age"],
      items: [],
    };
  },
};
</script>

<style scoped></style>
