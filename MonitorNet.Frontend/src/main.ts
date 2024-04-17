import { createApp } from "vue"

import App from "./App.vue"
import Modules from "./modules"
import Router from "./router"
import State from "./state"

const app = createApp(App)
app.use(Modules, { app, router: Router, state: State })
app.use(State)
app.use(Router)
app.mount("#app")
