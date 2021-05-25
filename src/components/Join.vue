<template>
  <div>
    <b-form @submit.stop.prevent>
      <label for="user ">User Name</label>
      <b-form-input
        type="text"
        v-model="name"
        id="username"
        required
      ></b-form-input>
      <label for="userEmail">User email</label>
      <b-form-input
        type="email"
        v-model="email"
        :state="emailvalidation"
        id="email"
        required
      ></b-form-input>
      <b-form-invalid-feedback :state="emailvalidation">
        Your user ID must be 8-30 email-format.
      </b-form-invalid-feedback>
      <b-form-valid-feedback :state="emailvalidation">
        Looks Good.
      </b-form-valid-feedback>
      <label for="text-password">Password</label>
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
      <address-api></address-api>
      <label for="detailAddress"> 상세 주소</label>
      <b-input
        v-model="detailAddress"
        type="text"
        id="sample4_detailAddress"
        placeholder="상세주소"
      />
      <b-button variant="warning">회원가입</b-button>
    </b-form>
  </div>
</template>

<script>
import AddressApi from "@/components/AddressAPI.vue";
export default {
  components: {
    AddressApi,
  },
  data() {
    return {
      name: "",
      email: "",
      password: "",
      pwcheck: "",
      address: "",
      detailAddress: "",
    };
  },
  computed: {
    emailvalidation() {
      return this.email.length > 8 && this.email.length < 30;
    },
    pwvalidation() {
      return this.pwcheck.length > 2 && this.password === this.pwcheck;
    },
  },
};
</script>

<style scoped></style>
