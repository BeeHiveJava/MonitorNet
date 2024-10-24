import type { Pinia } from "pinia"
import type { App, Plugin } from "vue"
import type { RouteRecordRaw, Router } from "vue-router"

import Charts from "./charts"
import Devices from "./devices"
import Home from "./home"
import Monitors from "./monitors"
import Symbols from "./symbols"

export type ModuleContext = {
  app: App
  router: Router
  state: Pinia
}

export type Module = {
  install?: (context: ModuleContext) => void
  routes?: RouteRecordRaw[]
}

const modules: Module[] = [Home, Devices, Symbols, Monitors, Charts]

function installRoutes(module: Module, context: ModuleContext) {
  for (const route of module?.routes ?? []) {
    context.router.addRoute(route)
  }
}

function install(module: Module, context: ModuleContext) {
  if (module.install) {
    module.install(context)
  }
}

export default {
  install: function (app: App, context: ModuleContext): void {
    for (const module of modules) {
      install(module, context)
      installRoutes(module, context)
    }
  }
} as Plugin<ModuleContext>
