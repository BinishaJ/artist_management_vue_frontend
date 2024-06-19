import "./assets/main.css";
import "vue-toastification/dist/index.css";
import Toast from "vue-toastification";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import { useUserStore } from "./stores/user";

const app = createApp(App);

const options = {
  timeout: 2000,
};

app.use(createPinia());
app.use(router);
app.use(Toast, options);

router.isReady().then(() => {
  const userStore = useUserStore();
  userStore.initUser();
});

app.mount("#app");
