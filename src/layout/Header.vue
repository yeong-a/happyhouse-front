<template>
    <div class="row">
        <div class="col-sm-10">
            <b-button variant="warning" @click="moveDetailPage"
                >주소별 매매가 확인</b-button
            >
            <b-button variant="warning" @click="moveSearchPage"
                >추천 기능</b-button
            >
            <b-button variant="warning">QnA 게시판</b-button>
        </div>
        <div v-if="this.$session.get('email') == null" class="col-sm-2">
            <b-button variant="warning" @click="showLoginModal"
                >로그인</b-button
            >
            <b-button variant="warning" @click="moveJoinPage"
                >회원가입</b-button
            >
        </div>
        <div v-else class="col-sm-2">
            <b-button variant="warning" @click="moveUpdatePage"
                >마이페이지</b-button
            >
            <b-button variant="warning" @click="logout">로그아웃</b-button>
        </div>
        <b-modal ref="login-modal" hide-footer title="HAPPYHOUSE LOGIN">
            <label for="text-id">ID</label>
            <b-form-input type="text" id="user_id"></b-form-input>
            <label for="text-password">Password</label>
            <b-form-input
                type="password"
                id="password"
                aria-describedby="password-help-block"
            ></b-form-input>
            <b-button variant="warning" @click="login">로그인</b-button>
            <b-button variant="warning" @click="hideLoginModal">닫기</b-button>
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
    methods: {
        showLoginModal() {
            this.$refs["login-modal"].show();
        },
        hideLoginModal() {
            this.$refs["login-modal"].hide();
        },
        moveJoinPage() {
            this.$router.push("/joinpage");
        },
        moveMainPage() {
            this.$router.push("/");
        },
        moveDetailPage() {
            this.$router.push("/detailpage");
        },
        moveUpdatePage() {
            this.$router.push("/updatepage");
        },
        moveSearchPage() {
            this.$router.push("/searchpage");
        },
        login() {
            this.$session.set("email", "june11215@naver.com");
            this.$session.set("password", "tkdwns12");
            console.log(this.$session.get("email"));
        },
        logout() {
            this.$session.clear();
        },
    },
};
</script>
