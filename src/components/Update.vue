<template>
  <div>
    <b-form @submit.stop.prevent>
      <label for="user ">User Name</label>
      <b-form-input
        v-model="username"
        type="text"
        value="username"
        id="username"
        readonly
      ></b-form-input>
      <label for="userEmail">User email</label>
      <b-form-input
        v-model="email"
        type="email"
        value="email"
        id="email"
        readonly
      ></b-form-input>
      <label for="text-password">Previous Password</label>
      <b-form-input
        type="password"
        id="pre_password"
        v-model="pre_password"
        aria-describedby="password-help-block"
        :state="uservalidation"
        required
      ></b-form-input>
      <br />
      <label for="text-password">New Password</label>
      <b-form-input
        type="password"
        id="new_password"
        v-model="new_password"
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
      <AddrerssAPI></AddrerssAPI>
      <label for="detailAddress">상세 주소</label>
      <b-form-input
        type="text"
        id="detailAddress"
        v-model="detailAddress"
        aria-placeholder="[상세주소]건물 , 동, 호수"
      ></b-form-input>
      <b-button variant="warning">회원 정보 수정</b-button>
    </b-form>
  </div>
</template>

<script>
import AddrerssAPI from "@/components/AddressAPI.vue";
export default {
  components: {
    AddrerssAPI,
  },
  created() {},
  data() {
    return {
      name: "",
      email: "",
      pre_password: "",
      new_password: "",
      pwcheck: "",
      detailAddress: "",
    };
  },
  computed: {
    pwvalidation() {
      return this.pwcheck.length > 2 && this.new_password === this.pwcheck;
    },
    uservalidation() {
      return this.$session.get("password") === this.pre_password;
    },
  },
};
</script>

<style scoped></style>
