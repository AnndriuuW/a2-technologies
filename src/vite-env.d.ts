/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FORMSPREE_ENDPOINT?: string;
  readonly VITE_WHATSAPP_NUMBER?: string;
  readonly VITE_CONTACT_EMAIL?: string;
  readonly VITE_SITE_URL?: string;
  readonly VITE_LINKEDIN_URL?: string;
  readonly VITE_GITHUB_URL?: string;
  readonly VITE_INSTAGRAM_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
