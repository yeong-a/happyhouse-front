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
  // getters: {
  //   getEmail: (state) => {
  //     return state.user.email;
  //   },
  // },
  mutations: {
    logout: (state) => {
      state.user = {};
    },
    getInfo: (state, payload) => {
      state.user = payload.user;
    },
  },
  actions: {
    login(store, payload) {
      return new Promise((resolve, reject) => {
        http
          .post(`happyhouse/user/login`, {
            email: payload.user.email,
            pwd: payload.user.pwd,
          })
          .then(
            (response) => {
              resolve(response);
            },
            (err) => {
              reject(err);
            }
          );
      });
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
    mypage(store) {
      return new Promise((resolve, reject) => {
        http.get(`happyhouse/user/mypage`).then(
          (response) => {
            store.state.user = response.data.result;
            resolve(response);
          },
          (err) => {
            reject(err);
            console.log(err.response.data.error);
          }
        );
      });
    },
  },
  modules: {},
});
