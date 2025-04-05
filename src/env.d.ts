/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_NOTION_SECRET: string
  readonly VITE_NOTION_DATABASE_ID: string
  readonly BASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
} 