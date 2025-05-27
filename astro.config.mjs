// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import vue from '@astrojs/vue';
import netlify from '@astrojs/netlify';
import sitemap from '@astrojs/sitemap';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://bizzly.nl',
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [vue(), sitemap(), react()],
  adapter: netlify()
});