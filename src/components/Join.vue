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
        v-if="type == 'update'"
        type="email"
        v-model="email"
        :state="emailvalidation"
        id="email"
        required
        readonly
      ></b-form-input>
      <b-form-input
        v-else
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
      <label v-if="type == 'update'" for="text-password">Pre-Password</label>
      <b-form-input
        v-if="type == 'update'"
        type="password"
        id="pre_password"
        aria-describedby="password-help-block"
        required
        :state="uservalidation"
      ></b-form-input>
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
      prePassword: "",
      password: "",
      pwcheck: "",
      address: "",
      detailAddress: "",
    };
  },
  created() {
    //   if (this.type === "update") {
    // http
    //   .get(`/happyhouse/qnaboard/${this.$route.params.no}`)
    //   .then(({ data }) => {
    //     this.email = data.email;
    //     this.prePassword = data.password;
    //   })
    //   .catch(() => {
    //     alert("에러가 발생했습니다.");
    //   });
  },
  computed: {
    emailvalidation() {
      return this.email.length > 8 && this.email.length < 30;
    },
    pwvalidation() {
      return this.pwcheck.length > 2 && this.password === this.pwcheck;
    },
    uservalidation() {
      return this.$data["prePassword"] === this.pre_password;
    },
  },
};
</script>

<style scoped></style>
