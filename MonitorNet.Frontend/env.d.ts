/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URI: string
  readonly VITE_API_SUBSCRIPTION_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
