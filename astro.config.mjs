// @ts-check
import { defineConfig } from 'astro/config';

// Static site. The GitHub Actions workflow builds this with `npm run build` and publishes
// `dist/` to GitHub Pages.
// `site` is used for canonical URLs and the sitemap; change it if the domain ever changes.
export default defineConfig({
  site: 'https://chequamegonsymphony.org',
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file' }, // /our-director.html style URLs, matching the old Weebly links
});
