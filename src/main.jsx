import { Buffer } from 'buffer'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { TonConnectUIProvider } from '@tonconnect/ui-react'
import Root from './Root'
import './index.css'

// Polyfill Buffer for browser environment
window.Buffer = Buffer
globalThis.Buffer = Buffer

// Use local manifest URL for development
const manifestUrl = window.location.origin + '/tonconnect-manifest.json'

ReactDOM.createRoot(document.getElementById('root')).render(
  <TonConnectUIProvider manifestUrl={manifestUrl}>
    <Root />
  </TonConnectUIProvider>
)
