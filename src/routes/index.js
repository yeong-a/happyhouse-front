import Vue from "vue";
import VueRouter from "vue-router";
import JoinPage from "@/page/JoinPage.vue";
import DetailPage from "@/page/DetailPage.vue";
import MainPage from "@/page/MainPage.vue";
import MyPage from "@/page/MyPage.vue";
import SearchPage from "@/page/SearchPage.vue";
import SearchPasswordPage from "@/page/SearchPasswordPage.vue";
import QnaCreatePage from "@/page/QNA/QnaCreatePage.vue";
import QnaDeletePage from "@/page/QNA/QnaDeletePage.vue";
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
      comments : QnaListPage
    },
    {
      path: "/qna/create",
      name: "qna-create-page",
      comments : QnaCreatePage
    },
    {
      path: "/qna/read/:no",
      name: "qna-read-page",
      comments : QnaReadPage
    },{
      path: "/qna/update/:no",
      name: "qna-update-page",
      comments : QnaUpdatePage
    },
    {
      path: "/qna/delete/:no",
      name: "qna-delete-page",
      comments : QnaDeletePage
    },
    {
      path: "/qna/delete/:no",
      name: "search-password-page",
      comments : SearchPasswordPage
    },
  ],
});
