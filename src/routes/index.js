import Vue from "vue";
import VueRouter from "vue-router";
import JoinPage from "@/page/JoinPage.vue";
import MainPage from "@/page/MainPage.vue";
import MyPage from "@/page/MyPage.vue";
import SearchPage from "@/page/SearchPage.vue";
import FindPasswordPage from "@/page/FindPasswordPage.vue";
import HouseSearchPage from "@/page/HouseSearchPage.vue";
import HouseDetailPage from "@/page/HouseDetailPage.vue";
import QnaCreatePage from "@/page/QNA/QnaCreatePage.vue";
import QnaListPage from "@/page/QNA/QnaListPage.vue";
import QnaReadPage from "@/page/QNA/QnaReadPage.vue";
import QnaUpdatePage from "@/page/QNA/QnaUpdatePage.vue";

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "main-page",
      component: MainPage,
    },
    {
      path: "/join",
      name: "join-page",
      component: JoinPage,
    },
    {
      path: "/mypage",
      name: "my-page",
      component: MyPage,
    },
    {
      path: "/search",
      name: "search-page",
      component: SearchPage,
    },
    {
      path: "/detail",
      name: "detail-page",
      component: HouseSearchPage,
    },
    {
      path: "/house",
      name: "house-page",
      component: HouseDetailPage,
    },
    {
      path: "/qna",
      name: "qna-page",
      component: QnaListPage,
    },
    {
      path: "/qna/:type",
      name: "qna-create-page",
      component: QnaCreatePage,
    },
    {
      path: "/qna/read/:no",
      name: "qna-read-page",
      component: QnaReadPage,
    },
    {
      path: "/qna/:type/:no",
      name: "qna-update-page",
      component: QnaUpdatePage,
    },
    {
      path: "/searchpassword",
      name: "search-password-page",
      component: FindPasswordPage,
    },
  ],
});
