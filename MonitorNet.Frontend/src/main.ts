import { createApp } from "vue"

import PrimeVue from "primevue/config"
import PrimeVueConfirmationService from "primevue/confirmationservice"
import PrimeVueTooltip from "primevue/tooltip"
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
app.use(PrimeVueConfirmationService)
app.directive("tooltip", PrimeVueTooltip)
app.mount("#app")
