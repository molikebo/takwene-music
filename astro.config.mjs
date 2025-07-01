// astro.config.mjs
import { defineConfig, sharpImageService } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://your-site-name.netlify.app', // Update this with your actual domain later
  integrations: [
    tailwindcss(),
    react()
  ],
  image: {
    service: sharpImageService({
      quality: 80,
      format: 'webp',
    }),
  },
  output: 'static', // Ensure static output for hosting
});