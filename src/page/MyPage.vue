<template>
  <div>
    <MyPage></MyPage>
    <change-password />
  </div>
</template>

<script>
import MyPage from "@/components/MyPage.vue";
import ChangePassword from "@/components/ChangePassword.vue";
export default {
  name: "my-page",
  components: {
    MyPage,
    ChangePassword,
  },
};
</script>

<style scoped></style>
