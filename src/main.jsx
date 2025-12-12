import React from 'react'
import ReactDOM from 'react-dom/client'
import { TonConnectUIProvider } from '@tonconnect/ui-react'
import Root from './Root'
import './index.css'

const manifestUrl = 'https://app.sonicengine.net/ton-manifest.json'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TonConnectUIProvider manifestUrl={manifestUrl}>
      <Root />
    </TonConnectUIProvider>
  </React.StrictMode>
)
