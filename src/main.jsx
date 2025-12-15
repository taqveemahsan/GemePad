import { Buffer } from 'buffer'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { TonConnectUIProvider } from '@tonconnect/ui-react'
import Root from './Root'
import './index.css'

// Polyfill Buffer for browser environment
window.Buffer = Buffer
globalThis.Buffer = Buffer

const manifestUrl = 'https://app.sonicengine.net/ton-manifest.json'

ReactDOM.createRoot(document.getElementById('root')).render(
  <TonConnectUIProvider manifestUrl={manifestUrl}>
    <Root />
  </TonConnectUIProvider>
)
