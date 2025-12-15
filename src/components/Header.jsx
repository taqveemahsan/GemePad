import React, { useMemo } from 'react'
import { useTonConnectUI, useTonAddress } from '@tonconnect/ui-react'
import { navigate } from '../navigation'

export default function Header() {
  const [tonConnectUI] = useTonConnectUI()
  const address = useTonAddress()

  const connectLabel = useMemo(() => {
    return address ? `${address.slice(0, 4)}…${address.slice(-4)}` : 'CONNECT WALLET'
  }, [address])

  return (
    <div className="hero__topbar">
      {/* Left Group */}
      <div className="nav-left">
        <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          GEMEPAD.FUN
        </div>
        <button className="btn-create" type="button">
          CREATE GAME
        </button>
      </div>

      {/* Center - Search */}
      <div className="search">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input type="text" placeholder="Search games here..." />
      </div>

      {/* Right Group */}
      <div className="nav-right">
        <button className="btn-p2e" type="button" onClick={() => navigate('/explore')}>
          GEME WORLD
        </button>
        <button
          className="btn-telegram"
          type="button"
          onClick={() => window.open('https://t.me/geme_pad_bot/app', '_blank')}
        >
          OPEN IN TELEGRAM
        </button>
        <button className="btn-connect" type="button" onClick={() => tonConnectUI.openModal()}>
          {connectLabel}
        </button>
      </div>
    </div>
  )
}
