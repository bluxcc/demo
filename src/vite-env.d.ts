/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WC_ID: string;
  readonly VITE_BLUX_APP_ID: string;
  readonly VITE_BLUX_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
