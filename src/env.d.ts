interface ImportMetaEnv {
  readonly VITE_DOMAIN: string;
  readonly VITE_NAVER_API_KEY_ID: string;
  readonly VITE_NAVER_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
