import React, { useState, useEffect, useCallback } from 'react'
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react'

const TradeInterface = ({ token, game }) => {
  const [activeTab, setActiveTab] = useState('buy')
  const [amount, setAmount] = useState(0.5)
  const [slippage, setSlippage] = useState(5)
  const [balance, setBalance] = useState(null)
  const [tokenBalance, setTokenBalance] = useState(null)
  const [tonPrice, setTonPrice] = useState(null)
  const [estimatedReceive, setEstimatedReceive] = useState(null)
  const [isSwapping, setIsSwapping] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [showErrorDialog, setShowErrorDialog] = useState(false)
  const [transactionSignature, setTransactionSignature] = useState('')

  const amountOptions = [0.1, 0.25, 0.5, 1, 2, 5]
  const slippageOptions = [1, 2, 3, 4, 5, 10]

  const address = useTonAddress()
  const [tonConnectUI] = useTonConnectUI()
  const connected = Boolean(address)

  // Check if token is on TON chain
  // If chain is not specified, default to TON for this component
  const isTonChain = !token?.chain || token?.chain === 'ton'
  const tokenAddress = token?.mintPublicKey || token?.tokenId || token?.id || token?.contractAddress

  // Debug logging
  useEffect(() => {
    console.log('[TradeInterface] Wallet connected:', connected)
    console.log('[TradeInterface] Address:', address)
    console.log('[TradeInterface] Token:', token)
    console.log('[TradeInterface] Is TON chain:', isTonChain)
    console.log('[TradeInterface] Token address:', tokenAddress)
  }, [connected, address, token, isTonChain, tokenAddress])

  // Fetch TON price
  useEffect(() => {
    let isMounted = true

    const fetchTonPrice = async () => {
      if (!isTonChain) return

      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=the-open-network&vs_currencies=usd'
        )
        const data = await response.json()
        if (data && data['the-open-network'] && data['the-open-network'].usd && isMounted) {
          setTonPrice(data['the-open-network'].usd)
        }
      } catch (error) {
        if (isMounted) {
          console.error('Error fetching TON price:', error)
        }
      }
    }

    fetchTonPrice()

    return () => {
      isMounted = false
    }
  }, [isTonChain])

  // Calculate estimated receive amount
  useEffect(() => {
    if (tonPrice && token?.price) {
      if (activeTab === 'buy') {
        // When buying tokens with TON
        const tokenPrice = token.price // Token price in USD
        const tonValue = amount * tonPrice // TON value in USD
        const estimatedTokens = tonValue / tokenPrice
        setEstimatedReceive({
          amount: estimatedTokens,
          symbol: 'tokens',
        })
      } else {
        // When selling tokens for TON
        const tokenPrice = token.price // Token price in USD
        const tokenValue = amount * tokenPrice // Token value in USD
        const estimatedTon = tokenValue / tonPrice
        setEstimatedReceive({
          amount: estimatedTon,
          symbol: 'TON',
        })
      }
    }
  }, [activeTab, amount, tonPrice, token, isTonChain])

  // Fetch TON balance
  const getBalance = useCallback(async () => {
    if (!connected || !address) {
      console.log('[TradeInterface] Cannot fetch balance - not connected or no address')
      setBalance(null)
      return
    }

    console.log('[TradeInterface] Fetching balance for address:', address)

    try {
      // Use TON API to get balance
      const response = await fetch(
        `https://tonapi.io/v2/accounts/${address}`
      )

      if (!response.ok) {
        throw new Error(`TON API returned ${response.status}`)
      }

      const data = await response.json()
      console.log('[TradeInterface] Balance data:', data)

      if (data && data.balance !== undefined) {
        // Balance is in nanoTON, convert to TON
        const tonBalance = Number(data.balance) / 1e9
        console.log('[TradeInterface] TON Balance:', tonBalance)
        setBalance(tonBalance)
      } else {
        console.warn('[TradeInterface] No balance field in response')
        setBalance(0)
      }
    } catch (error) {
      console.error('[TradeInterface] Error fetching TON balance:', error)
      // Set to 0 instead of null so UI shows something
      setBalance(0)
    }
  }, [address, connected])

  // Fetch token balance
  const getTokenBalance = useCallback(async () => {
    if (!connected || !address) {
      console.log('[TradeInterface] Cannot fetch token balance - not connected or no address')
      setTokenBalance(null)
      return
    }

    if (!tokenAddress) {
      console.log('[TradeInterface] No token address provided, skipping token balance fetch')
      setTokenBalance(0)
      return
    }

    console.log('[TradeInterface] Fetching token balance for:', tokenAddress)

    try {
      // Use TON API to get jetton balance
      const response = await fetch(
        `https://tonapi.io/v2/accounts/${address}/jettons`
      )

      if (!response.ok) {
        throw new Error(`TON API returned ${response.status}`)
      }

      const data = await response.json()
      console.log('[TradeInterface] Jettons data:', data)

      if (data && data.balances) {
        // Find the specific jetton by address
        const jetton = data.balances.find(
          b => b.jetton.address === tokenAddress
        )

        console.log('[TradeInterface] Found jetton:', jetton)

        if (jetton && jetton.balance) {
          // Balance is in smallest units, typically 9 decimals
          const balance = Number(jetton.balance) / 1e9
          console.log('[TradeInterface] Token balance:', balance)
          setTokenBalance(balance)
        } else {
          console.log('[TradeInterface] Jetton not found or no balance')
          setTokenBalance(0)
        }
      } else {
        console.log('[TradeInterface] No balances in response')
        setTokenBalance(0)
      }
    } catch (error) {
      console.error('[TradeInterface] Error fetching token balance:', error)
      setTokenBalance(0)
    }
  }, [address, connected, tokenAddress])

  // Fetch balances when connected
  useEffect(() => {
    console.log('[TradeInterface] Balance fetch effect triggered')
    console.log('[TradeInterface] - connected:', connected)
    console.log('[TradeInterface] - isTonChain:', isTonChain)

    if (connected) {
      console.log('[TradeInterface] Fetching balances...')
      getBalance()
      getTokenBalance()
    } else {
      console.log('[TradeInterface] Not connected, clearing balances')
      setBalance(null)
      setTokenBalance(null)
    }
  }, [connected, isTonChain, getBalance, getTokenBalance])

  // Handle swap for TON chain
  const handleSwap = async () => {
    if (isSwapping) return

    if (!connected || !address) {
      setErrorMessage('TON wallet not connected. Please connect your wallet to continue.')
      setShowErrorDialog(true)
      return
    }

    if (!isTonChain) {
      setErrorMessage('This token is not on TON chain.')
      setShowErrorDialog(true)
      return
    }

    // Check balance before proceeding
    if (activeTab === 'buy') {
      const gasBuffer = 0.05 // Buffer for transaction fees
      const totalNeeded = amount + gasBuffer

      if (balance === null || balance < totalNeeded) {
        setErrorMessage(
          `Insufficient TON balance. You need ${totalNeeded.toFixed(5)} TON but have ${balance?.toFixed(4) || 0} TON.`
        )
        setShowErrorDialog(true)
        return
      }
    }

    if (activeTab === 'sell' && (tokenBalance === null || tokenBalance < amount)) {
      setErrorMessage(
        `Insufficient token balance. You need ${amount} tokens but have ${tokenBalance?.toFixed(4) || 0} tokens.`
      )
      setShowErrorDialog(true)
      return
    }

    setIsSwapping(true)

    try {
      // For now, show a message that full swap integration requires additional setup
      // In production, you would integrate with ston.fi or another DEX here
      setErrorMessage(
        'TON swap functionality requires additional setup with a DEX (like ston.fi). ' +
        'Please install the required packages: @ton/ton, @ton/core, @ston-fi/sdk, @ston-fi/api'
      )
      setShowErrorDialog(true)

      // Example of how the swap would work:
      // 1. Initialize TON client
      // 2. Get swap parameters from ston.fi API
      // 3. Build transaction
      // 4. Send via TonConnect
      // See TradeInterface.js swapTON() function for full implementation

    } catch (error) {
      console.error('Error during swap:', error)
      setErrorMessage(
        `Swap failed: ${error instanceof Error ? error.message : 'Unknown error occurred'}. Please try again.`
      )
      setShowErrorDialog(true)
    } finally {
      setIsSwapping(false)
    }
  }

  // If not TON chain, show message
  if (!isTonChain) {
    return (
      <div className="gd-trade">
        <div className="gd-form">
          <div style={{
            padding: '20px',
            textAlign: 'center',
            color: '#999',
            fontSize: '14px'
          }}>
            This token is not on TON blockchain. TON trading is only available for TON chain tokens.
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="gd-trade">
      <div className="gd-tabs">
        <button
          className={`gd-tab ${activeTab === 'buy' ? 'gd-tab--active' : ''}`}
          type="button"
          onClick={() => setActiveTab('buy')}
        >
          Buy
        </button>
        <button
          className={`gd-tab ${activeTab === 'sell' ? 'gd-tab--active' : ''}`}
          type="button"
          onClick={() => setActiveTab('sell')}
        >
          Sell
        </button>
      </div>

      {/* Balance Display */}
      <div style={{ padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ color: '#999', fontSize: '13px' }}>TON Balance:</span>
          <span style={{ color: '#fff', fontSize: '13px', fontWeight: '500' }}>
            {!connected ? 'Connect wallet' : balance !== null ? `${balance.toFixed(4)} TON` : 'Loading...'}
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: '#999', fontSize: '13px' }}>Token Balance:</span>
          <span style={{ color: '#fff', fontSize: '13px', fontWeight: '500' }}>
            {!connected ? 'Connect wallet' : tokenBalance !== null ? tokenBalance.toFixed(4) : 'Loading...'}
          </span>
        </div>
        {connected && address && (
          <div style={{ marginTop: '8px', fontSize: '11px', color: '#666', textAlign: 'center' }}>
            Connected: {address.slice(0, 6)}...{address.slice(-6)}
          </div>
        )}
      </div>

      {/* TON Price Display */}
      {tonPrice && (
        <div style={{ padding: '8px 0', textAlign: 'center' }}>
          <span style={{ color: '#999', fontSize: '12px' }}>TON Price: </span>
          <span style={{ color: '#4ade80', fontSize: '12px', fontWeight: '600' }}>
            ${tonPrice.toFixed(2)}
          </span>
        </div>
      )}

      <div className="gd-form">
        {/* Amount Selection */}
        <label className="gd-field">
          <span>
            Amount
            <span style={{ marginLeft: '4px', color: '#999', fontSize: '12px' }}>
              ({activeTab === 'buy' ? 'TON' : token?.symbol || 'tokens'})
            </span>
          </span>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            step="0.1"
            min="0.1"
          />
        </label>

        {/* Amount Options */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '8px',
          marginBottom: '16px'
        }}>
          {amountOptions.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setAmount(option)}
              style={{
                padding: '8px',
                background: amount === option ? 'rgba(74, 222, 128, 0.2)' : 'rgba(255,255,255,0.05)',
                border: amount === option ? '1px solid #4ade80' : '1px solid rgba(255,255,255,0.1)',
                borderRadius: '6px',
                color: amount === option ? '#4ade80' : '#fff',
                fontSize: '13px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Slippage Selection */}
        <label className="gd-field">
          <span>Slippage %</span>
          <input
            type="number"
            value={slippage}
            onChange={(e) => setSlippage(Number(e.target.value))}
            step="0.5"
            min="0.1"
            max="50"
          />
        </label>

        {/* Slippage Options */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '8px',
          marginBottom: '16px'
        }}>
          {slippageOptions.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setSlippage(option)}
              style={{
                padding: '8px',
                background: slippage === option ? 'rgba(74, 222, 128, 0.2)' : 'rgba(255,255,255,0.05)',
                border: slippage === option ? '1px solid #4ade80' : '1px solid rgba(255,255,255,0.1)',
                borderRadius: '6px',
                color: slippage === option ? '#4ade80' : '#fff',
                fontSize: '13px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {option}%
            </button>
          ))}
        </div>

        {/* Estimated Receive Amount */}
        <div className="gd-receive">
          {!connected ? (
            <span style={{ color: '#ef4444' }}>Please connect your wallet</span>
          ) : !tonPrice ? (
            <span style={{ color: '#999' }}>Loading TON price...</span>
          ) : !token?.price ? (
            <span style={{ color: '#999' }}>Loading token price...</span>
          ) : estimatedReceive ? (
            <>
              You'll receive approximately{' '}
              <span style={{ color: '#4ade80', fontWeight: '600' }}>
                {estimatedReceive.amount.toFixed(4)} {estimatedReceive.symbol}
              </span>
            </>
          ) : (
            <span style={{ color: '#999' }}>Calculating...</span>
          )}
        </div>

        {/* Error messages for insufficient balance */}
        {activeTab === 'buy' && balance !== null && (() => {
          const gasBuffer = 0.05
          const totalNeeded = amount + gasBuffer
          return balance < totalNeeded
        })() && (
          <div style={{
            padding: '12px',
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '8px',
            color: '#ef4444',
            fontSize: '13px',
            marginBottom: '12px'
          }}>
            Insufficient TON balance. You need {(() => {
              const gasBuffer = 0.05
              const totalNeeded = amount + gasBuffer
              return totalNeeded.toFixed(5)
            })()} TON but have {balance.toFixed(4)} TON.
          </div>
        )}

        {activeTab === 'sell' && tokenBalance !== null && tokenBalance < amount && (
          <div style={{
            padding: '12px',
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '8px',
            color: '#ef4444',
            fontSize: '13px',
            marginBottom: '12px'
          }}>
            Insufficient token balance. You need {amount} tokens but have {tokenBalance.toFixed(4)} tokens.
          </div>
        )}

        {/* Buy/Sell Button */}
        <button
          className="gd-cta"
          type="button"
          onClick={handleSwap}
          disabled={
            isSwapping ||
            (activeTab === 'buy' && (balance === null || balance < amount + 0.05)) ||
            (activeTab === 'sell' && (tokenBalance === null || tokenBalance < amount))
          }
          style={{
            opacity: isSwapping ||
              (activeTab === 'buy' && (balance === null || balance < amount + 0.05)) ||
              (activeTab === 'sell' && (tokenBalance === null || tokenBalance < amount))
              ? 0.5
              : 1,
            cursor: isSwapping ||
              (activeTab === 'buy' && (balance === null || balance < amount + 0.05)) ||
              (activeTab === 'sell' && (tokenBalance === null || tokenBalance < amount))
              ? 'not-allowed'
              : 'pointer'
          }}
        >
          {isSwapping ? 'Processing...' : activeTab === 'buy' ? 'Buy' : 'Sell'}
        </button>
      </div>

      {/* Success Dialog */}
      {showSuccessDialog && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
          }}
          onClick={() => setShowSuccessDialog(false)}
        >
          <div
            style={{
              background: '#1a1a2e',
              border: '1px solid #333',
              borderRadius: '12px',
              padding: '24px',
              maxWidth: '500px',
              width: '90%',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ color: '#4ade80', marginBottom: '16px', fontSize: '20px' }}>
              Transaction Successful!
            </h3>
            <p style={{ color: '#fff', marginBottom: '16px' }}>{successMessage}</p>
            {transactionSignature && (
              <div style={{
                background: '#2a2a3e',
                padding: '12px',
                borderRadius: '8px',
                marginBottom: '16px',
              }}>
                <p style={{ color: '#999', fontSize: '12px', marginBottom: '4px' }}>
                  Transaction ID:
                </p>
                <p style={{
                  color: '#fff',
                  fontSize: '14px',
                  fontFamily: 'monospace',
                  wordBreak: 'break-all',
                }}>
                  {transactionSignature}
                </p>
              </div>
            )}
            <div style={{ display: 'flex', gap: '12px' }}>
              {transactionSignature && (
                <button
                  type="button"
                  onClick={() => {
                    window.open(`https://tonscan.org/tx/${transactionSignature}`, '_blank')
                  }}
                  style={{
                    flex: 1,
                    padding: '12px',
                    background: '#4ade80',
                    color: '#000',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: '600',
                    cursor: 'pointer',
                  }}
                >
                  View on TON Explorer
                </button>
              )}
              <button
                type="button"
                onClick={() => setShowSuccessDialog(false)}
                style={{
                  flex: 1,
                  padding: '12px',
                  background: 'rgba(255,255,255,0.1)',
                  color: '#fff',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '8px',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Error Dialog */}
      {showErrorDialog && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
          }}
          onClick={() => setShowErrorDialog(false)}
        >
          <div
            style={{
              background: '#1a1a2e',
              border: '1px solid #333',
              borderRadius: '12px',
              padding: '24px',
              maxWidth: '500px',
              width: '90%',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ color: '#ef4444', marginBottom: '16px', fontSize: '20px' }}>
              Transaction Failed
            </h3>
            <p style={{ color: '#fff', marginBottom: '16px' }}>{errorMessage}</p>
            <button
              type="button"
              onClick={() => setShowErrorDialog(false)}
              style={{
                width: '100%',
                padding: '12px',
                background: 'rgba(255,255,255,0.1)',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '8px',
                fontWeight: '600',
                cursor: 'pointer',
              }}
            >
              Try Again
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default TradeInterface
