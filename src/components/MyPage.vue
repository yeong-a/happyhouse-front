<template>
  <div>
    <b-form @submit.stop.prevent>
      <label>User Name</label>
      <b-form-input type="text" v-model="this.info.name"></b-form-input>
      <label>User email</label>
      <b-form-input
        type="email"
        v-model="this.info.email"
        readonly
      ></b-form-input>
      <div>
        <b-button @click="execDaumPostcode()">주소 검색</b-button>
        <br />
        <label>주소</label>
        <b-input
          v-model="this.info.address"
          type="text"
          id="jibunAddress"
          placeholder="지번주소 검색"
        />
      </div>
      <label>상세 주소</label>
      <b-form-input
        type="text"
        v-model="this.info.detailAddress"
        placeholder="[상세주소]건물 , 동, 호수"
      ></b-form-input>
      <b-button variant="warning">회원 정보 수정</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  created() {
    this.getInfo();
  },
  data() {
    return {
      info: {
        name: "",
        email: "",
        address: "",
        detailAddress: "",
      },
    };
  },
  computed: {
    nowInfo() {
      return this.$store.state.user;
    },
  },
  watch: {
    nowInfo(newInfo) {
      this.info.name = newInfo.name;
      this.info.email = newInfo.email;
      this.info.address = newInfo.address;
      this.info.detailAddress = newInfo.detailAddress;
    },
  },
  methods: {
    getInfo() {
      this.$store.dispatch("mypage");
    },
    execDaumPostcode() {
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
          console.log(data);
          document.getElementById("jibunAddress").value = data.jibunAddress;
        },
      }).open();
    },
  },
};
</script>

<style scoped></style>
