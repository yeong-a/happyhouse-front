<template>
  <div class="row">
    <div class="col-sm-10">
      <b-button variant="warning" @click="moveDetailPage"
        >주소별 매매가 확인</b-button
      >
      <b-button variant="warning" @click="moveSearchPage">추천 기능</b-button>
      <b-button variant="warning" @click="moveQnaPage">QnA 게시판</b-button>
    </div>
    <div class="col-sm-2" v-if="$store.state.user.email === ''">
      <b-button variant="warning" @click="showLoginModal">로그인</b-button>
      <b-button variant="warning" @click="moveJoinPage">회원가입</b-button>
    </div>
    <div class="col-sm-2" v-else>
      <b-button variant="warning" @click="moveUpdatePage">마이페이지</b-button>
      <b-button variant="warning" @click="logout">로그아웃</b-button>
    </div>
    <b-modal ref="login-modal" hide-footer title="HAPPYHOUSE LOGIN">
      <label for="text-id">ID</label>
      <b-form-input type="text" v-model="loginUser.email"></b-form-input>
      <label for="text-password">Password</label>
      <b-form-input
        type="password"
        aria-describedby="password-help-block"
        v-model="loginUser.pwd"
      ></b-form-input>
      <b-button variant="warning" @click="login">로그인</b-button>
      <b-button variant="warning" @click="moveSPPage">비밀번호 찾기</b-button>
    </b-modal>
    <div class="col-sm-12">
      <h1
        @click="moveMainPage"
        class="text-light bg-dark"
        style="
          height: 160px;
          line-height: 160px;
          display: block;
          text-align: center;
        "
      >
        HAPPY HOUSE
      </h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppHeader",
  data() {
    return {
      loginUser: {
        email: "",
        pwd: "",
      },
    };
  },
  methods: {
    showLoginModal() {
      this.$refs["login-modal"].show();
    },
    hideLoginModal() {
      this.$refs["login-modal"].hide();
    },
    moveJoinPage() {
      this.$router.push("/join");
    },
    moveMainPage() {
      window.location.replace("/");
    },
    moveDetailPage() {
      this.$router.push("/detail");
    },
    moveUpdatePage() {
      this.$router.push("/mypage");
    },
    moveSearchPage() {
      this.$router.push("/search");
    },
    moveQnaPage() {
      this.$router.push("/qna");
    },
    moveSPPage() {
      this.$router.push("/searchpassword");
      this.hideLoginModal();
    },
    async login() {
      try {
        await this.$store.dispatch("login", {
          user: {
            email: this.loginUser.email,
            pwd: this.loginUser.pwd,
          },
        });
      } catch (err) {
        alert(`로그인 실패: ${err.response.data.error}`);
        return;
      }
      this.hideLoginModal();
    },
    logout() {
      this.$store.dispatch("logout");
      this.moveMainPage();
    },
  },
};
</script>
