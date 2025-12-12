import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

function tonconnectManifestHandler({ https }) {
  return function handler(req, res, next) {
    if (req.url !== '/tonconnect-manifest.json') return next()

    const protocol = https ? 'https' : 'http'
    const host = req.headers.host || req.headers[':authority']
    if (!host) {
      res.statusCode = 400
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ error: 'Missing Host header' }))
      return
    }

    const origin = `${protocol}://${host}`
    const manifest = {
      url: origin,
      name: 'GEMEPAD',
      iconUrl: `${origin}/tonconnect-icon-180.png`,
    }

    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(manifest))
  }
}

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'tonconnect-manifest',
      configureServer(server) {
        server.middlewares.use(tonconnectManifestHandler({ https: false }))
      },
      configurePreviewServer(server) {
        server.middlewares.use(tonconnectManifestHandler({ https: false }))
      },
    },
  ],
  server: {
    port: 3000,
  },
})
