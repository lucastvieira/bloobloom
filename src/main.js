import { createApp } from "vue";
import BootstrapVue3 from "bootstrap-vue-3";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { createVueWait } from "vue-wait";
import VueAxios from "vue-axios";
import axios from "@/services/api";
import mixin from "@/mixins/global";
import { store } from "@/store";

/* import specific icons */
import {
  faChevronLeft,
  faChevronRight,
  faSpinner,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

/* add icons to the library */
library.add(faChevronLeft, faChevronRight, faSpinner, faTimes);

import App from "@/App.vue";
import router from "@/router";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-3/dist/bootstrap-vue-3.css";
import "@/assets/fonts.scss";
import "@/assets/main.scss";

const app = createApp(App);
const VueWait = createVueWait();

app.use(router);
app.use(store);
app.use(BootstrapVue3);
app.use(VueWait);
app.use(VueAxios, { $axios: axios });
app.component("font-awesome-icon", FontAwesomeIcon);
app.mixin(mixin);

app.mount("#app");
