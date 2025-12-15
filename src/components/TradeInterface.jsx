import React, { useState, useEffect, useCallback, useMemo } from 'react'
import ReactDOM from 'react-dom'
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react'
import { TonClient } from '@ton/ton'
import { Address, toNano, Cell } from '@ton/core'
import { StonApiClient } from '@ston-fi/api'
import { dexFactory } from '@ston-fi/sdk'
import { CHAIN } from '@tonconnect/sdk'

const TradeInterface = ({ token, game }) => {
  const [activeTab, setActiveTab] = useState('buy')
  const [amount, setAmount] = useState(0.5)
  const [slippage, setSlippage] = useState(5)
  const [balance, setBalance] = useState(null)
  const [tokenBalance, setTokenBalance] = useState(null)
  const [tokenDecimals, setTokenDecimals] = useState(9)
  const [tonPrice, setTonPrice] = useState(null)
  const [tokenPrice, setTokenPrice] = useState(null)
  const [tokenPriceStatus, setTokenPriceStatus] = useState('idle') // idle | loading | loaded | unavailable
  const [needsDerivedTokenPrice, setNeedsDerivedTokenPrice] = useState(false)
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

  const tryParseAddress = useCallback((value) => {
    if (!value) return null
    try {
      return Address.parse(value)
    } catch {
      return null
    }
  }, [])

  const tokenMasterAddress = useMemo(() => tryParseAddress(tokenAddress), [tryParseAddress, tokenAddress])

  const amountToJettonUnits = useCallback((value, decimals) => {
    const normalized = String(value ?? '').trim()
    if (!normalized || normalized === '0') return '0'
    const [wholePart, fractionalPart = ''] = normalized.split('.')
    const safeWhole = wholePart.replace(/^0+(?=\d)/, '') || '0'
    const paddedFraction = (fractionalPart + '0'.repeat(decimals)).slice(0, decimals)
    const combined = `${safeWhole}${paddedFraction}`
    const withoutLeadingZeros = combined.replace(/^0+(?=\d)/, '') || '0'
    return BigInt(withoutLeadingZeros).toString()
  }, [])

  const unitsToNumber = useCallback((unitsString, decimals) => {
    try {
      const units = BigInt(String(unitsString))
      const scale = 10n ** BigInt(decimals)
      if (scale === 0n) return null
      const whole = units / scale
      const frac = units % scale
      if (decimals === 0) return Number(whole.toString())
      const fracStr = frac.toString().padStart(decimals, '0').replace(/0+$/, '')
      const valueString = fracStr ? `${whole.toString()}.${fracStr}` : whole.toString()
      const value = Number(valueString)
      return Number.isFinite(value) ? value : null
    } catch {
      return null
    }
  }, [])

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
          console.log('[TradeInterface] TON Price loaded:', data['the-open-network'].usd)
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

  // Set token price from props or fetch from TON API (jetton price)
  useEffect(() => {
    let isMounted = true

    const fetchTokenPrice = async () => {
      if (!isTonChain) return

      if (typeof token?.price === 'number' && Number.isFinite(token.price) && token.price > 0) {
        setTokenPrice(token.price)
        setTokenPriceStatus('loaded')
        setNeedsDerivedTokenPrice(false)
        console.log('[TradeInterface] Token price from props:', token.price)
        return
      }

      if (!tokenMasterAddress) {
        setTokenPrice(null)
        setTokenPriceStatus('unavailable')
        setNeedsDerivedTokenPrice(false)
        return
      }

      try {
        setTokenPriceStatus('loading')
        setNeedsDerivedTokenPrice(false)
        setTokenPrice(null)
        const master = tokenMasterAddress.toString()
        const response = await fetch(`https://tonapi.io/v2/jettons/${master}`)
        if (!response.ok) throw new Error(`TON API returned ${response.status}`)
        const data = await response.json()
        console.log('[TradeInterface] Jetton info:', data)

        const priceUsd =
          data?.prices?.USD ??
          data?.prices?.usd ??
          data?.price?.USD ??
          data?.price?.usd ??
          data?.market_data?.price_usd

        if (isMounted && typeof priceUsd === 'number' && Number.isFinite(priceUsd) && priceUsd > 0) {
          setTokenPrice(priceUsd)
          setTokenPriceStatus('loaded')
          setNeedsDerivedTokenPrice(false)
          return
        }

        const decimals =
          data?.metadata?.decimals ??
          data?.jetton?.decimals ??
          data?.decimals

        const parsedDecimals = Number.parseInt(String(decimals ?? ''), 10)
        if (isMounted && Number.isFinite(parsedDecimals) && parsedDecimals >= 0 && parsedDecimals <= 18) {
          setTokenDecimals(parsedDecimals)
        }

        if (isMounted) {
          setNeedsDerivedTokenPrice(true)
        }
      } catch (error) {
        if (isMounted) {
          console.error('[TradeInterface] Error fetching token price:', error)
          setTokenPrice(null)
          setNeedsDerivedTokenPrice(true)
        }
      }
    }

    fetchTokenPrice()

    return () => {
      isMounted = false
    }
  }, [isTonChain, token?.price, tokenMasterAddress])

  // Derive token USD price from DEX swap simulation if TON API doesn't provide a price.
  useEffect(() => {
    let isMounted = true

    const derivePriceFromSimulation = async () => {
      if (!isTonChain) return
      if (!needsDerivedTokenPrice) return
      if (!tokenMasterAddress) {
        setTokenPriceStatus('unavailable')
        setNeedsDerivedTokenPrice(false)
        return
      }
      if (!tonPrice || !Number.isFinite(tonPrice) || tonPrice <= 0) return

      try {
        setTokenPriceStatus('loading')
        const apiClient = new StonApiClient()

        const TON_ADDRESS = 'EQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM9c'
        const tonAddrStr = Address.parse(TON_ADDRESS).toString()
        const jettonAddrStr = tokenMasterAddress.toString()

        const offerTon = 0.1
        const simulationResult = await apiClient.simulateSwap({
          offerAddress: tonAddrStr,
          askAddress: jettonAddrStr,
          offerUnits: toNano(offerTon.toString()).toString(),
          slippageTolerance: '0.01',
        })

        const askUnits = simulationResult?.askUnits
        const decimals = tokenDecimals ?? 9
        const tokensReceived = unitsToNumber(askUnits, decimals)

        if (!isMounted) return

        if (!tokensReceived || tokensReceived <= 0) {
          setTokenPrice(null)
          setTokenPriceStatus('unavailable')
          setNeedsDerivedTokenPrice(false)
          return
        }

        const derivedUsd = (offerTon * tonPrice) / tokensReceived
        if (!Number.isFinite(derivedUsd) || derivedUsd <= 0) {
          setTokenPrice(null)
          setTokenPriceStatus('unavailable')
          setNeedsDerivedTokenPrice(false)
          return
        }

        setTokenPrice(derivedUsd)
        setTokenPriceStatus('loaded')
        setNeedsDerivedTokenPrice(false)
      } catch (error) {
        if (!isMounted) return
        console.error('[TradeInterface] Error deriving token price:', error)
        setTokenPrice(null)
        setTokenPriceStatus('unavailable')
        setNeedsDerivedTokenPrice(false)
      }
    }

    derivePriceFromSimulation()

    return () => {
      isMounted = false
    }
  }, [isTonChain, needsDerivedTokenPrice, tokenMasterAddress, tokenDecimals, tonPrice, unitsToNumber])

  // Calculate estimated receive amount
  useEffect(() => {
    if (tonPrice && tokenPrice) {
      console.log('[TradeInterface] Calculating estimate with TON price:', tonPrice, 'Token price:', tokenPrice)
      if (activeTab === 'buy') {
        // When buying tokens with TON
        const tonValue = amount * tonPrice // TON value in USD
        const estimatedTokens = tonValue / tokenPrice
        console.log('[TradeInterface] Buy estimate:', estimatedTokens, 'tokens')
        setEstimatedReceive({
          amount: estimatedTokens,
          symbol: 'tokens',
        })
      } else {
        // When selling tokens for TON
        const tokenValue = amount * tokenPrice // Token value in USD
        const estimatedTon = tokenValue / tonPrice
        console.log('[TradeInterface] Sell estimate:', estimatedTon, 'TON')
        setEstimatedReceive({
          amount: estimatedTon,
          symbol: 'TON',
        })
      }
    } else {
      console.log('[TradeInterface] Cannot calculate estimate - TON price:', tonPrice, 'Token price:', tokenPrice)
    }
  }, [activeTab, amount, tonPrice, tokenPrice, isTonChain])

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

    if (!tokenAddress || !tokenMasterAddress) {
      console.log('[TradeInterface] No token address provided, skipping token balance fetch')
      setTokenBalance(0)
      return
    }

    console.log('[TradeInterface] Fetching token balance for:', tokenMasterAddress.toString())

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
        const jetton = data.balances.find((b) => {
          const candidate = tryParseAddress(b?.jetton?.address)
          return candidate && tokenMasterAddress && candidate.equals(tokenMasterAddress)
        })

        console.log('[TradeInterface] Found jetton:', jetton)

        if (jetton && jetton.balance) {
          const decimals =
            jetton?.jetton?.decimals ??
            jetton?.jetton?.metadata?.decimals ??
            tokenDecimals ??
            9
          const parsedDecimals = Number.parseInt(String(decimals), 10)
          if (Number.isFinite(parsedDecimals) && parsedDecimals >= 0 && parsedDecimals <= 18) {
            setTokenDecimals(parsedDecimals)
          }

          const divisor = 10 ** (Number.isFinite(parsedDecimals) ? parsedDecimals : 9)
          const humanBalance = Number(jetton.balance) / divisor
          console.log('[TradeInterface] Token balance:', humanBalance, 'decimals:', parsedDecimals)
          setTokenBalance(humanBalance)
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
  }, [address, connected, tokenAddress, tokenMasterAddress, tokenDecimals, tryParseAddress])

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
      console.log('[TON SWAP] Starting swap...')

      // Check if we have TonConnect sendTransaction method
      if (!tonConnectUI || typeof tonConnectUI.sendTransaction !== 'function') {
        throw new Error('TonConnect sendTransaction not available')
      }

      // Initialize TON client
      const tonClient = new TonClient({
        endpoint: 'https://toncenter.com/api/v2/jsonRPC',
      })

      // Initialize ston.fi API client
      const apiClient = new StonApiClient()

      // Parse addresses
      if (!tokenAddress) {
        throw new Error('Token address not available')
      }

      const userWalletAddress = Address.parse(address)
      const jettonAddress = Address.parse(tokenAddress)

      // TON address constant
      const TON_ADDRESS = 'EQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM9c'
      const tonAddrStr = Address.parse(TON_ADDRESS).toString()
      const jettonAddrStr = jettonAddress.toString()

      // Determine swap direction
      let offerAddress, askAddress
      if (activeTab === 'buy') {
        // Buy: TON -> Jetton
        offerAddress = tonAddrStr
        askAddress = jettonAddrStr
      } else {
        // Sell: Jetton -> TON
        offerAddress = jettonAddrStr
        askAddress = tonAddrStr
      }

      // Convert offer amount to base units
      const offerUnits =
        activeTab === 'buy'
          ? toNano(amount.toString()).toString()
          : amountToJettonUnits(amount, tokenDecimals ?? 9)

      console.log('[TON SWAP] Simulating swap...', {
        offerAddress,
        askAddress,
        offerUnits,
      })

      // Simulate swap
      const slippageTolerance = (slippage / 100).toFixed(4)
      const simulationResult = await apiClient.simulateSwap({
        offerAddress,
        askAddress,
        offerUnits,
        slippageTolerance,
      })

      console.log('[TON SWAP] Simulation result:', simulationResult)

      if (!simulationResult || !simulationResult.router) {
        throw new Error('Failed to simulate swap. Router information not available.')
      }

      // Get router from simulation
      const routerInfo = simulationResult.router
      const dexContracts = dexFactory(routerInfo)
      const router = tonClient.open(dexContracts.Router.create(routerInfo.address))
      const proxyTon = dexContracts.pTON.create(routerInfo.ptonMasterAddress)

      // Prepare transaction parameters
      const sharedTxParams = {
        userWalletAddress: userWalletAddress.toString(),
        offerAmount: simulationResult.offerUnits,
        minAskAmount: simulationResult.minAskUnits,
      }

      console.log('[TON SWAP] Getting transaction params...')

      // Get transaction parameters based on swap type
      let txParams
      if (activeTab === 'buy') {
        txParams = await router.getSwapTonToJettonTxParams({
          ...sharedTxParams,
          proxyTon,
          askJettonAddress: jettonAddrStr,
        })
      } else {
        txParams = await router.getSwapJettonToTonTxParams({
          ...sharedTxParams,
          proxyTon,
          offerJettonAddress: jettonAddrStr,
        })
      }

      console.log('[TON SWAP] Transaction params:', txParams)

      // Format transaction message
      const message = {
        address: txParams.to.toString(),
        amount: txParams.value.toString(),
        payload: txParams.body?.toBoc().toString('base64'),
      }

      console.log('[TON SWAP] Sending transaction...')

      // Send transaction
      const result = await tonConnectUI.sendTransaction({
        validUntil: Date.now() + 5 * 60 * 1000,
        network: CHAIN.MAINNET,
        messages: [message],
      })

      console.log('[TON SWAP] Transaction sent:', result)

      // Extract transaction hash
      let txHash = null
      if (result && result.boc) {
        try {
          const cell = Cell.fromBase64(result.boc)
          const hashBuffer = cell.hash()
          txHash = hashBuffer.toString('hex')
          console.log('[TON SWAP] Transaction hash:', txHash)
        } catch (error) {
          console.error('[TON SWAP] Error parsing BOC:', error)
          txHash = result.boc.substring(0, 64)
        }
      }

      // Show success
      setTransactionSignature(txHash || 'Transaction sent')
      setSuccessMessage(
        `Transaction successful! You ${activeTab === 'buy' ? 'bought' : 'sold'} ${amount} ${
          activeTab === 'buy' ? 'TON' : 'tokens'
        } and will receive approximately ${
          estimatedReceive
            ? estimatedReceive.amount.toFixed(4) + ' ' + estimatedReceive.symbol
            : 'your tokens/TON'
        }.`
      )
      setShowSuccessDialog(true)

      // Refresh balances
      setTimeout(() => {
        getBalance()
        getTokenBalance()
      }, 2000)
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

      {/* Token Price Display */}
      {typeof tokenPrice === 'number' && Number.isFinite(tokenPrice) && tokenPrice > 0 && (
        <div style={{ padding: '0 0 8px', textAlign: 'center' }}>
          <span style={{ color: '#999', fontSize: '12px' }}>
            {token?.symbol || 'Token'} Price:{' '}
          </span>
          <span style={{ color: '#4ade80', fontSize: '12px', fontWeight: '600' }}>
            ${tokenPrice < 0.01 ? tokenPrice.toFixed(6) : tokenPrice.toFixed(4)}
          </span>
        </div>
      )}
      {tokenPriceStatus === 'unavailable' && (
        <div style={{ padding: '0 0 8px', textAlign: 'center' }}>
          <span style={{ color: '#777', fontSize: '12px' }}>
            {token?.symbol || 'Token'} price unavailable
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
          ) : tokenPriceStatus === 'loading' ? (
            <span style={{ color: '#999' }}>Loading token price...</span>
          ) : tokenPriceStatus === 'unavailable' ? (
            <span style={{ color: '#999' }}>Token price unavailable</span>
          ) : !tokenPrice ? (
            <span style={{ color: '#999' }}>Token price unavailable</span>
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
      {showSuccessDialog && ReactDOM.createPortal(
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
            zIndex: 999999,
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
        </div>,
        document.body
      )}

      {/* Error Dialog */}
      {showErrorDialog && ReactDOM.createPortal(
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
            zIndex: 999999,
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
        </div>,
        document.body
      )}
    </div>
  )
}

export default TradeInterface
