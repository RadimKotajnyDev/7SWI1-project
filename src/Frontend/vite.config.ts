import react from "@vitejs/plugin-react";
import {defineConfig, loadEnv} from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd(), '');

  console.log('VITE_GATEWAY_URL:', env.VITE_GATEWAY_URL);

  return {
    plugins: [react(), tsconfigPaths()],
    server: {
      proxy: {
        '/api': {
          target: env.VITE_GATEWAY_URL,
          changeOrigin: true,
          secure: false,
          // Add this to help debug
          configure: (proxy, _options) => {
            proxy.on('error', (err, _req, _res) => {
              console.log('proxy error', err);
            });
            proxy.on('proxyReq', (proxyReq, req, _res) => {
              console.log('Sending Request to the Target:', req.method, req.url);
            });
            proxy.on('proxyRes', (proxyRes, req, _res) => {
              console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
            });
          },
        }
      }
    }
  }
})