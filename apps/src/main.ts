import { createApp } from "vue";
import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";

import App from "./App.vue";
import "./index.css";
import "primeicons/primeicons.css";
import { router } from "@/routers/router";
import pinia from "@/stores/store";

const app = createApp(App);
app.use(pinia);
app.use(router);
app.use(PrimeVue, { theme: { preset: Aura } });
app.mount("#app");
