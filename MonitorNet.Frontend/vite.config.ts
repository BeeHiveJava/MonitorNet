import Vue from "@vitejs/plugin-vue"
import { fileURLToPath, URL } from "node:url"
import AutoImport from "unplugin-auto-import/vite"
import IconsResolver from "unplugin-icons/resolver"
import Icons from "unplugin-icons/vite"
import { PrimeVueResolver } from "unplugin-vue-components/resolvers"
import Components from "unplugin-vue-components/vite"
import { defineConfig } from "vite"
import VueDevTools from "vite-plugin-vue-devtools"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Vue(),
    VueDevTools(),
    Icons({ compiler: "vue3" }),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/ // .md
      ],
      imports: [
        "vue",
        "vue-router",
        "@vueuse/core",
        "pinia"
      ]
    }),
    Components({
      dts: true,
      dirs: "src/**/*",
      resolvers: [
        PrimeVueResolver(),
        IconsResolver({
          componentPrefix: "icon",
          enabledCollections: ["mdi"]
        }),
        (name) => {
          // Currently missing in the base library.
          const components = [
            "ButtonGroup",
            "ConfirmPopup",
            "ConfirmDialog",
            "DynamicDialog",
            "FloatLabel",
            "IconField",
            "InputIcon",
            "InputGroup",
            "InputGroupAddon",
            "MeterGroup",
            "Toast"
          ]

          if (components.includes(name)) {
            return `primevue/${name.toLowerCase()}`
          }

          return undefined
        }
      ]
    })
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    }
  }
})
