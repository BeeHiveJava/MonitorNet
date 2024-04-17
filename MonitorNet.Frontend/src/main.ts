import { createApp } from "vue"

import PrimeVue from "primevue/config"
import "primevue/resources/themes/aura-light-green/theme.css"
import "primeflex/primeflex.css"

import App from "./App.vue"
import Modules from "./modules"
import Router from "./router"
import State from "./state"

const app = createApp(App)
app.use(Modules, { app, router: Router, state: State })
app.use(State)
app.use(Router)
app.use(PrimeVue)
app.mount("#app")
