<template>
  <div>
    <detail
      :content="item.content"
      :title="item.title"
      :writer="item.writer"
      :regtime="item.regtime"
      :no="item.no"
    />
  </div>
</template>

<script>
import http from "@/http-common";
import Detail from "@/components/QNA/QnaDetail.vue";
export default {
  name: "read",
  components: {
    Detail,
  },
  data: function () {
    return {
      item: {},
    };
  },
  created() {
    http
      .get(`/happyhouse/qnaboard/${this.$route.params.no}`)
      .then(({ data }) => {
        this.item = data;
      });
  },
};
</script>

<style></style>
