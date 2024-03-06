interface ImportMetaEnv {
  VITE_CLIENT_URL: any;
  readonly VITE_API_URL: string;
  // Добавьте здесь другие переменные окружения, если они вам нужны
 }
 
 interface ImportMeta {
  readonly env: ImportMetaEnv;
 }