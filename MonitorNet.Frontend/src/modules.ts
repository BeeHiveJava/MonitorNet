import type { Pinia } from "pinia"
import type { App, Plugin } from "vue"
import type { RouteRecordRaw, Router } from "vue-router"
import devices from "./devices"
import home from "./home"

export type ModuleContext = {
  app: App
  router: Router
  state: Pinia
}

export type Module = {
  install?: (context: ModuleContext) => void
  routes?: RouteRecordRaw[]
}

const modules: Module[] = [
  home,
  devices
]

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
