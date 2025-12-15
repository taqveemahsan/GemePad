import React, { useEffect, useRef, useState } from 'react'
import { navigate } from '../navigation'
import WalletConnectButton from './WalletConnectButton'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isOpenMenuOpen, setIsOpenMenuOpen] = useState(false)
  const openMenuRef = useRef(null)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  useEffect(() => {
    if (!isOpenMenuOpen) return

    const onPointerDown = (e) => {
      const root = openMenuRef.current
      if (!root) return
      if (root.contains(e.target)) return
      setIsOpenMenuOpen(false)
    }

    const onKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpenMenuOpen(false)
    }

    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('touchstart', onPointerDown, { passive: true })
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('touchstart', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpenMenuOpen])

  return (
    <div className="hero__topbar">
      {/* Left Group */}
      <div className="nav-left">
        <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          GEMEPAD.FUN
        </div>
        <button
          className="btn-create"
          type="button"
          onClick={() => window.open('https://editor.gemepad.fun/', '_blank')}
        >
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
        <WalletConnectButton className="btn-connect" />
        <div className="open-menu" ref={openMenuRef}>
          <button
            className="btn-open"
            type="button"
            aria-haspopup="menu"
            aria-expanded={isOpenMenuOpen}
            onClick={() => setIsOpenMenuOpen((v) => !v)}
          >
            <svg
              className="btn-open__chevron"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          {isOpenMenuOpen && (
            <div className="open-menu__dropdown" role="menu" aria-label="Open in">
              <button
                className="open-menu__item"
                type="button"
                role="menuitem"
                onClick={() => {
                  setIsOpenMenuOpen(false)
                  window.open('https://editor.gemepad.fun/', '_blank', 'noopener,noreferrer')
                }}
              >
                <svg
                  className="open-menu__icon"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 0 20" />
                  <path d="M12 2a15.3 15.3 0 0 0 0 20" />
                </svg>
                Web
              </button>
              <button
                className="open-menu__item"
                type="button"
                role="menuitem"
                onClick={() => {
                  setIsOpenMenuOpen(false)
                  window.open('https://t.me/gemepad_bot/gemepad', '_blank', 'noopener,noreferrer')
                }}
              >
                <svg
                  className="open-menu__icon"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M22 2 11 13" />
                  <path d="M22 2 15 22 11 13 2 9 22 2Z" />
                </svg>
                Telegram Bot
              </button>
            </div>
          )}
        </div>
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
