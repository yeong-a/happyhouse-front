import Vue from "vue";
import App from "./App.vue";
import { router } from "./routes/index.js";
import store from "./store";
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import VueSession from "vue-session";

Vue.use(BootstrapVue);
Vue.config.productionTip = false;
var sessionOptions = {
  persist: true,
};
Vue.use(VueSession, sessionOptions);
new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");
