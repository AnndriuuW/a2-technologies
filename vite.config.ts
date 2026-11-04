import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv, type Plugin } from 'vite';

/**
 * Keeps the public domain in one place (VITE_SITE_URL): adds the canonical and
 * absolute Open Graph URLs to index.html, and generates robots.txt and
 * sitemap.xml at build time, since both need absolute URLs.
 */
function siteUrlPlugin(rawSiteUrl: string | undefined): Plugin {
  const siteUrl = rawSiteUrl?.trim().replace(/\/+$/, '') ?? '';

  return {
    name: 'a2-site-url',
    transformIndexHtml() {
      if (!siteUrl) return [];
      return [
        { tag: 'link', attrs: { rel: 'canonical', href: `${siteUrl}/` }, injectTo: 'head' },
        { tag: 'meta', attrs: { property: 'og:url', content: `${siteUrl}/` }, injectTo: 'head' },
        {
          tag: 'meta',
          attrs: { property: 'og:image', content: `${siteUrl}/images/og-image.png` },
          injectTo: 'head',
        },
        {
          tag: 'meta',
          attrs: { name: 'twitter:image', content: `${siteUrl}/images/og-image.png` },
          injectTo: 'head',
        },
      ];
    },
    generateBundle() {
      const sitemapLine = siteUrl ? `\nSitemap: ${siteUrl}/sitemap.xml\n` : '';
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n${sitemapLine}`,
      });

      if (!siteUrl) {
        this.warn('VITE_SITE_URL is empty: canonical URL and sitemap.xml were skipped.');
        return;
      }
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: [
          '<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
          `  <url><loc>${siteUrl}/</loc></url>`,
          '</urlset>',
          '',
        ].join('\n'),
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, import.meta.dirname, 'VITE_');

  return {
    plugins: [react(), tailwindcss(), siteUrlPlugin(env.VITE_SITE_URL)],
  };
});
