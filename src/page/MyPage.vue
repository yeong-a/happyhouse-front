<template>
  <div>
    <b-card title="회원 정보 수정" class="mb-3">
      <b-form @submit.stop.prevent>
        <b-form-group label="사용자 이메일">
          <b-form-input
            type="email"
            v-model="userInfo.email"
            id="email"
            readonly
          />
        </b-form-group>
        <b-form-group label="사용자 이름">
          <b-form-input v-model="userInfo.name" required />
        </b-form-group>
        <b-form-group label="주소">
          <b-input-group>
            <b-input
              v-model="userInfo.address"
              placeholder="주소를 검색해주세요."
              readonly
            />
            <b-input-group-append>
              <b-button @click="execDaumPostcode()">주소 검색</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
        <b-form-group label="상세 주소">
          <b-input v-model="userInfo.detailAddress" placeholder="상세 주소" />
        </b-form-group>
        <div class="text-right">
          <b-button variant="success" @click="updateInfo">
            회원 정보 수정
          </b-button>
        </div>
      </b-form>
    </b-card>
    <b-card title="비밀번호 변경">
      <b-form @submit.stop.prevent>
        <b-form-group label="이전 비밀번호">
          <b-form-input type="password" v-model="oldPassword" required />
        </b-form-group>
        <b-form-group label="새 비밀번호">
          <b-form-input type="password" v-model="newPassword" required />
        </b-form-group>
        <b-form-group label="새 비밀번호 확인">
          <b-form-input
            type="password"
            :state="pwvalidation"
            v-model="newPasswordConfirm"
            required
          />
          <b-form-invalid-feedback :state="pwvalidation">
            비밀번호 확인이 일치하지 않습니다.
          </b-form-invalid-feedback>
        </b-form-group>
        <div class="text-right">
          <b-button variant="success" @click="changePassword"
            >비밀번호 변경</b-button
          >
        </div>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import http from "@/http-common";

export default {
  name: "my-page",
  data() {
    return {
      userInfo: {
        name: "",
        email: "",
        address: "",
        detailAddress: "",
      },
      oldPassword: "",
      newPassword: "",
      newPasswordConfirm: "",
    };
  },
  computed: {
    pwvalidation() {
      return (
        this.newPassword.length > 0 &&
        this.newPassword === this.newPasswordConfirm
      );
    },
  },
  created() {
    this.getInfo();
  },
  methods: {
    async getInfo() {
      const response = await http.get(`happyhouse/user/mypage`);
      this.userInfo = response.data.result;
    },
    execDaumPostcode() {
      const that = this;
      new window.daum.Postcode({
        oncomplete: function (data) {
          var extraRoadAddr = "";
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
          that.userInfo.address =
            data.userSelectedType === "R"
              ? data.roadAddress
              : data.jibunAddress;
        },
      }).open();
    },
    async updateInfo() {
      await http.put("/happyhouse/user/update", {
        name: this.userInfo.name,
        address: this.userInfo.address,
        detailAddress: this.userInfo.detailAddress,
      });
      alert("회원정보가 수정되었습니다.");
      await this.getInfo();
      this.$store.dispatch("mypage");
    },
    async changePassword() {
      try {
        await http.put("/happyhouse/user/changepwd", {
          currentPwd: this.oldPassword,
          newPwd: this.newPassword,
        });
        alert("비밀번호가 변경되었습니다.");
        this.oldPassword = "";
        this.newPassword = "";
        this.newPasswordConfirm = "";
      } catch (err) {
        alert(`비밀번호를 변경하지 못했습니다: ${err.response.data.error}`);
      }
    },
  },
};
</script>

<style scoped></style>
