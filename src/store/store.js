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
    logout(store) {
      http
        .post(`happyhouse/user/logout`)
        .then(() => {
          store.commit("logout");
          alert("로그아웃");
        })
        .catch((err) => alert(err.response.data.error));
    },
    async mypage(store) {
      const response = await http.get(`happyhouse/user/mypage`);
      store.commit("setUser", response.data.result);
    },
    modify(store, payload) {
      http
        .put(`happyhouse/user/update`, {
          name: payload.user.name,
          address: payload.user.address,
          detailAddress: payload.user.detailAddress,
        })
        .then(() => {
          console.log("수정 성공");
          store.commit("setUser", payload.user);
        })
        .catch((err) => {
          alert(err.response.data.error);
        });
    },
  },
  modules: {},
});
