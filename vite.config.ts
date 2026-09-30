import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    port: 3000,
    open: false,
    host: true,
    watch: {
      ignored: (file: string) => {
        const normalized = file.replace(/\\/g, '/');
        if (/\.(m4v|mp4|mov|mkv|webm|avi|wmv|flv|crdownload|part|tmp|png|jpg|jpeg|gif|webp|svg|zip|rar|7z|tar|gz)$/i.test(normalized)) {
          return true;
        }
        if (/(^|\/)(public|videos|images|dist|node_modules|\.git)($|\/)/i.test(normalized)) {
          return true;
        }
        return false;
      }
    }
  }
});


