import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

// Normal multi-file build for hosting (Netlify). Set SINGLEFILE=1 to bundle everything
// into one HTML file for a portable preview.
export default defineConfig({
  plugins: [react(), ...(process.env.SINGLEFILE ? [viteSingleFile()] : [])],
});
