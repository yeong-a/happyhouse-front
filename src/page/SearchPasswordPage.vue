<template>
  <div>
    <h2>비밀번호 찾기</h2>
    <b-form @submit.stop.prevent>
      <b-form-group label="사용자 이메일">
        <b-form-input
          type="email"
          v-model="email"
          placeholder="가입시 이메일을 입력해주세요"
          required
        />
      </b-form-group>
      <b-form-group label="사용자 이름">
        <b-form-input
          v-model="name"
          placeholder="회원 이름을 입력해주세요"
          required
        />
      </b-form-group>
      <b-button variant="primary">비밀번호 찾기</b-button>
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
};
</script>

<style scoped></style>
