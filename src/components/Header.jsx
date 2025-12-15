import React, { useState } from 'react'
import { navigate } from '../navigation'
import WalletConnectButton from './WalletConnectButton'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

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
        <WalletConnectButton className="btn-connect" />
      </div>

      {/* Hamburger Menu Button - Mobile Only */}
      <button className="hamburger-btn" type="button" onClick={toggleMenu} aria-label="Menu">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <>
          <div className="mobile-menu-overlay" onClick={closeMenu}></div>
          <div className="mobile-menu">
            <button className="mobile-menu-close" onClick={closeMenu} aria-label="Close menu">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            
            {/* Search Bar in Mobile Menu */}
            <div className="mobile-search">
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

            {/* GEME World Button */}
            <button 
              className="mobile-btn-p2e" 
              type="button" 
              onClick={() => {
                navigate('/explore')
                closeMenu()
              }}
            >
              GEME WORLD
            </button>

            {/* Connect Wallet Button */}
            <WalletConnectButton
              className="mobile-btn-connect"
              block
              align="left"
              onOpenModal={closeMenu}
              onDisconnect={closeMenu}
            />
          </div>
        </>
      )}
    </div>
  )
}
