<template>
  <div class="row">
    <b-form @submit.stop.prevent>
      <label for="user ">User Email</label>
      <b-form-input
        type="email"
        v-model="email"
        id="email"
        placeholder="가입시 이메일을 입력해주세요"
        required
      ></b-form-input>
      <label for="user ">User Name</label>
      <b-form-input
        type="text"
        v-model="name"
        id="username"
        placeholder="회원 이름을 입력해주세요"
        required
      ></b-form-input>
      <b-button variant="warning">입력</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      name: "",
    };
  },
  methods: {},
};
</script>

<style scoped></style>
