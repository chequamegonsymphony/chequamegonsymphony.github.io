// @ts-check
import { defineConfig } from 'astro/config';

// Static site. Cloudflare Pages builds this with `npm run build` and serves `dist/`.
// `site` is used for canonical URLs and the sitemap; change it if the domain ever changes.
export default defineConfig({
  site: 'https://chequamegonsymphony.org',
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file' }, // /our-director.html style URLs, matching the old Weebly links
});
