<template>
  <div>
    <b-form @submit.stop.prevent>
      <label>Pre-Password</label>
      <b-form-input
        v-model="prePassword"
        type="password"
        id="pre_password"
        aria-describedby="password-help-block"
        aria-placeholder="기존 비밀번호를 입력해주세요"
        required
        :state="uservalidation"
      ></b-form-input>
      <label for="text-password">New Password</label>
      <b-form-input
        type="password"
        id="password"
        v-model="password"
        aria-describedby="password-help-block"
        required
      ></b-form-input>
      <b-form-text id="password-help-block">
        Your password must be 8-20 characters long, contain letters and numbers,
        and must not contain spaces, special characters, or emoji.
      </b-form-text>
      <br />
      <label for="check-password">Password check</label>
      <b-form-input
        type="password"
        :state="pwvalidation"
        id="pwcheck"
        v-model="pwcheck"
      ></b-form-input>
      <b-form-invalid-feedback :state="pwvalidation">
        password is not same
      </b-form-invalid-feedback>
    </b-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userPassword: "",
      prePassword: "",
      password: "",
      pwcheck: "",
    };
  },

  computed: {
    pwvalidation() {
      return this.pwcheck.length > 2 && this.password === this.pwcheck;
    },
    uservalidation() {
      return this.$data["prePassword"] === this.userPassword;
    },
  },
};
</script>

<style scoped></style>
