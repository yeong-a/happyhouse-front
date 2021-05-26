import Vue from "vue";
import VueRouter from "vue-router";
import JoinPage from "@/page/JoinPage.vue";
import DetailPage from "@/page/DetailPage.vue";
import MainPage from "@/page/MainPage.vue";
import MyPage from "@/page/MyPage.vue";
import SearchPage from "@/page/SearchPage.vue";
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
  ],
});
