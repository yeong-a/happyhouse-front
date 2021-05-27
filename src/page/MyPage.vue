<template>
  <div>
    <UserInfo></UserInfo>
    <ChangePassword />
  </div>
</template>

<script>
import UserInfo from "@/components/UserInfo.vue";
import ChangePassword from "@/components/ChangePassword.vue";
export default {
  name: "my-page",
  components: {
    UserInfo,
    ChangePassword,
  },
};
</script>

<style scoped></style>
