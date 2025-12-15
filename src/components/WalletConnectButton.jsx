import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react'

export default function WalletConnectButton({
  className = 'btn-connect',
  disconnectedLabel = 'CONNECT WALLET',
  block = false,
  align = 'right',
  onOpenModal,
  onDisconnect,
}) {
  const [tonConnectUI] = useTonConnectUI()
  const address = useTonAddress()
  const connected = Boolean(address)

  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)

  const label = useMemo(() => {
    return address ? `${address.slice(0, 4)}…${address.slice(-4)}` : disconnectedLabel
  }, [address, disconnectedLabel])

  useEffect(() => {
    if (!open) return
    const handleOutside = (event) => {
      if (!rootRef.current) return
      if (!rootRef.current.contains(event.target)) setOpen(false)
    }
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', handleOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  useEffect(() => {
    if (!connected) setOpen(false)
  }, [connected])

  const handleButtonClick = async () => {
    if (!connected) {
      try {
        await tonConnectUI.connectWallet()
      } catch {
        await tonConnectUI.openModal()
      } finally {
        onOpenModal?.()
      }
      return
    }
    setOpen((v) => !v)
  }

  const handleDisconnect = async () => {
    try {
      await tonConnectUI.disconnect()
    } finally {
      setOpen(false)
      onDisconnect?.()
    }
  }

  return (
    <div
      ref={rootRef}
      className={['wallet-menu', block ? 'wallet-menu--block' : null].filter(Boolean).join(' ')}
    >
      <button
        className={className}
        type="button"
        onClick={() => void handleButtonClick()}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        {label}
      </button>
      {open && (
        <div
          className={['wallet-dropdown', align === 'left' ? 'wallet-dropdown--left' : null]
            .filter(Boolean)
            .join(' ')}
          role="menu"
          onClick={(e) => e.stopPropagation()}
        >
          <button className="wallet-dropdown__item wallet-dropdown__item--danger" type="button" onClick={handleDisconnect} role="menuitem">
            Disconnect
          </button>
        </div>
      )}
    </div>
  )
}
