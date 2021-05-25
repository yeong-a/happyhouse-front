import Vue from "vue";
import VueRouter from "vue-router";
import JoinPage from "@/page/joinpage.vue";
import DetailPage from "@/page/detailpage.vue";
import kakaomap from '@/components/kakaomap.vue';
import UpdatePage from "@/page/updatepage.vue";
import SearchPage from "@/page/searchpage.vue";
Vue.use(VueRouter);

export const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "main",
      component: kakaomap,
    },
    {
      path: "/joinpage",
      name: "joinpage",
      component: JoinPage,
    },
    {
      path: "/detailpage",
      name: "detailpage",
      component: DetailPage,
    },
    {
      path: "/updatepage",
      name: "updatepage",
      component: UpdatePage,
    },
    {
      path: "/searchpage",
      name: "searchpage",
      component: SearchPage,
    }
  ],
});
