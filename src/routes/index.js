import Vue from "vue";
import VueRouter from "vue-router";
import JoinPage from "@/page/JoinPage.vue";
import DetailPage from "@/page/DetailPage.vue";
import MainPage from "@/page/MainPage.vue";
import MyPage from "@/page/MyPage.vue";
import SearchPage from "@/page/SearchPage.vue";
import SearchPasswordPage from "@/page/SearchPasswordPage.vue";
import QnaCreatePage from "@/page/QNA/QnaCreatePage.vue";
import QnaListPage from "@/page/QNA/QnaListPage.vue";
import QnaReadPage from "@/page/QNA/QnaReadPage.vue";
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
      path: "/detail",
      name: "detail-page",
      component: DetailPage,
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
      path: "/qna",
      name: "qna-page",
      comments: QnaListPage,
    },
    {
      path: "/qna/create",
      name: "qna-create-page",
      comments: QnaCreatePage,
    },
    {
      path: "/qna/read/:no",
      name: "qna-read-page",
      comments: QnaReadPage,
    },
    {
      path: "/searchpassword",
      name: "search-password-page",
      comments : SearchPasswordPage
    },
  ],
});
