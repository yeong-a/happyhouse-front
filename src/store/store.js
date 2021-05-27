import Vue from "vue";
import Vuex from "vuex";
import http from "@/http-common";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    formType: "",
    user: {
      email: "",
      name: "",
      address: "",
      detailAddress: "",
    },
    question: {},
    questions: [],
    answers: [],
  },
  mutations: {
    changeType: (state, payload) => {
      state.formType = payload;
    },
    logout: (state) => {
      state.user = {};
    },
    setUser: (state, payload) => {
      state.user = payload;
    },
    setQuestion: (state, payload) => {
      state.question = payload;
    },
    setQuestions: (state, payload) => {
      state.questions = payload;
    },
    setAnswers: (state, payload) => {
      state.answers = payload;
    },
  },
  actions: {
    async changeType(store, payload) {
      await store.commit("changeType", payload);
    },
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
          alert("수정되었습니다.");
          store.commit("setUser", payload.user);
        })
        .catch((err) => {
          alert(err.response.data.error);
        });
    },
    async getQuestion(store, payload) {
      const response = await http.get(`happyhouse/qnaboard/${payload}`);
      store.commit("setQuestion", response.data.result);
    },
    async getAnswers(store, payload) {
      const response = await http.get(`happyhouse/qnaboard/answer/${payload}`);
      store.commit("setAnswers", response.data.result);
    },
  },
});
