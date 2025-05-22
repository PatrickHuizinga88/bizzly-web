// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import vue from '@astrojs/vue';
import netlify from '@astrojs/netlify';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://bizzly.nl',
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [vue(), sitemap()],
  adapter: netlify()
});