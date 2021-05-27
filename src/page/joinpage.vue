<template>
  <div>
    <b-form @submit.stop.prevent>
      <b-form-group label="사용자 이메일">
        <b-form-input
          type="email"
          v-model="email"
          :state="emailvalidation"
          id="email"
          required
        />
        <b-form-invalid-feedback :state="emailvalidation">
          이메일 형식이 맞지 않습니다.
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group label="사용자 이름">
        <b-form-input v-model="name" required />
      </b-form-group>
      <b-form-group
        label="사용자 비밀번호"
        description="비밀번호는 8-20 자리의 영문자, 숫자, 특수문자로 구성되어야 합니다."
      >
        <b-form-input
          type="password"
          id="password"
          v-model="password"
          required
        />
      </b-form-group>
      <b-form-group label="사용자 비밀번호 확인">
        <b-form-input
          type="password"
          :state="pwvalidation"
          id="pwcheck"
          v-model="pwcheck"
          required
        />
        <b-form-invalid-feedback :state="pwvalidation">
          비밀번호 확인이 일치하지 않습니다.
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group label="주소">
        <b-input-group>
          <b-input
            v-model="address"
            placeholder="주소를 검색해주세요."
            readonly
          />
          <b-input-group-append>
            <b-button @click="execDaumPostcode()">주소 검색</b-button>
          </b-input-group-append>
        </b-input-group>
      </b-form-group>
      <b-form-group label="상세 주소">
        <b-input v-model="detailAddress" placeholder="상세 주소" />
      </b-form-group>
      <div class="text-right">
        <b-button variant="primary">회원가입</b-button>
      </div>
    </b-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      name: "",
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
      return this.password.length > 0 && this.password === this.pwcheck;
    },
    uservalidation() {
      return this.$data["prePassword"] === this.pre_password;
    },
  },
  methods: {
    execDaumPostcode() {
      const that = this;
      new window.daum.Postcode({
        oncomplete: function (data) {
          let extraRoadAddr = "";
          if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
            extraRoadAddr += data.bname;
          }
          if (data.buildingName !== "" && data.apartment === "Y") {
            extraRoadAddr +=
              extraRoadAddr !== ""
                ? ", " + data.buildingName
                : data.buildingName;
          }
          if (extraRoadAddr !== "") {
            extraRoadAddr = " (" + extraRoadAddr + ")";
          }
          that.address =
            data.userSelectedType === "R"
              ? data.roadAddress
              : data.jibunAddress;
        },
      }).open();
    },
  },
};
</script>

<style scoped></style>
