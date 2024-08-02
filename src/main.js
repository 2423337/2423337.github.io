import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import axios from "axios";
import VueVideoPlayer from "vue-video-player";
import "video.js/dist/video-js.css";
import "vue-video-player/src/custom-theme.css";
import locale from "element-ui/lib/locale/lang/en";

Vue.use(VueVideoPlayer);
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;
Vue.use(ElementUI, { locale });

new Vue({
	router,
	render: (h) => h(App),
}).$mount("#app");
