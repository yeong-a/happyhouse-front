<template>
<<<<<<< HEAD
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
=======
  <UserInfo></UserInfo>
</template>

<script>
import UserInfo from "@/components/UserInfo.vue";

export default {
  name: "my-page",
  components: {
    UserInfo,
>>>>>>> 66a905248b1b927109e1b25e5352c7f5e062f4ad
  },
};
</script>

<style scoped></style>
