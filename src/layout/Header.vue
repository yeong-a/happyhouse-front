<template>
  <div>
    <b-navbar toggleable="lg">
      <router-link to="/" custom v-slot="{ href, navigate }">
        <b-navbar-brand :href="href" @click="navigate"
          >HAPPY HOUSE</b-navbar-brand
        >
      </router-link>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <router-link to="/detail" custom v-slot="{ href, navigate }">
            <b-nav-item :href="href" @click="navigate">
              주소별 매매가 확인
            </b-nav-item>
          </router-link>
          <router-link to="/search" custom v-slot="{ href, navigate }">
            <b-nav-item :href="href" @click="navigate">추천 기능</b-nav-item>
          </router-link>
          <router-link to="/qna" custom v-slot="{ href, navigate }">
            <b-nav-item :href="href" @click="navigate">QnA 게시판</b-nav-item>
          </router-link>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right v-if="$store.state.user.email">
            <template #button-content>
              <em>{{ $store.state.user.name }}</em>
            </template>
            <router-link to="/mypage" custom v-slot="{ href, navigate }">
              <b-dropdown-item :href="href" @click="navigate">
                마이 페이지
              </b-dropdown-item>
            </router-link>
            <b-dropdown-item href="#" @click="logout">로그아웃</b-dropdown-item>
          </b-nav-item-dropdown>
          <template v-else>
            <b-nav-item href="#" v-b-modal.login-modal>로그인</b-nav-item>
            <router-link to="/join" custom v-slot="{ href, navigate }">
              <b-nav-item :href="href" @click="navigate">회원가입</b-nav-item>
            </router-link>
          </template>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <b-modal
      id="login-modal"
      title="HAPPYHOUSE LOGIN"
      ok-only
      ok-title="로그인"
      @ok="login"
    >
      <b-form-group label="이메일">
        <b-form-input v-model="loginUser.email"></b-form-input>
      </b-form-group>
      <b-form-group label="비밀번호">
        <b-form-input type="password" v-model="loginUser.pwd"></b-form-input>
      </b-form-group>
      <router-link
        to="/searchpassword"
        @click.native="$bvModal.hide('login-modal')"
        >비밀번호 찾기</router-link
      >
    </b-modal>
  </div>
  <!-- <div class="row">
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
  </div> -->
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
