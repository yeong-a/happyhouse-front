import Vue from "vue";
import Vuex from "vuex";
import http from "@/http-common";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      email: "",
      name: "",
      address: "",
      detailAddress: "",
    },
  },
  mutations: {
    logout: (state) => {
      state.user = {};
    },
    setUser: (state, payload) => {
      state.user = payload;
    },
  },
  actions: {
    async login(store, payload) {
      await http.post(`happyhouse/user/login`, {
        email: payload.user.email,
        pwd: payload.user.pwd,
      });
      await store.dispatch("mypage");
    },
    async logout(store) {
      await http.post(`happyhouse/user/logout`);
      store.commit("logout");
      alert("로그아웃 되었습니다.");
    },
    async mypage(store) {
      try {
        const response = await http.get(`happyhouse/user/mypage`);
        store.commit("setUser", response.data.result);
      } catch (err) {
        return;
      }
    },
  },
});
