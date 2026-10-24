/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Window {
  __trevykRemoveLcpShell?: () => void;
  __trevykGaLoaded?: boolean;
  __trevykStaticHeroReady?: boolean;
}
