import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react'
import { navigate, getNavigationState } from '../navigation'
import { useGameById } from '../hooks/useGames'
import heroBg from '../assets/herosection/Mask group (3).png'
import Bg01 from '../assets/herosection/Bg01.png'
import top1 from '../assets/toplaunches/Frame 48.png'
import top2 from '../assets/toplaunches/Frame 51.png'
import top3 from '../assets/toplaunches/Frame 52.png'
import top4 from '../assets/toplaunches/Frame 53.png'
import top5 from '../assets/toplaunches/Frame 54.png'
import top6 from '../assets/toplaunches/Frame 55.png'

const isDev = import.meta?.env?.DEV

const topLaunches = [
  { title: 'Uncharted 4', img: top1 },
  { title: 'Elden Ring', img: top2 },
  { title: 'Spider-Man 2', img: top3 },
  { title: 'Horizon', img: top4 },
  { title: 'Ghosts', img: top5 },
  { title: 'Final Fantasy', img: top6 },
]

function GameCard({ title, img }) {
  return (
    <div className="game-card">
      <div className="game-card__media">
        <img src={img} alt={title} />
        <div className="badge">12k Players</div>
      </div>
      <div className="game-card__body">
        <h4>{title}</h4>
        <div className="game-card__info">
          <span>Token Name</span>
          <span>$0.058</span>
        </div>
        <button className="btn-play" type="button" onClick={() => navigate('/game')}>
          ▶ PLAY
        </button>
      </div>
    </div>
  )
}

function StatRow({ label, value, link }) {
  return (
    <div className="gd-stat">
      <span className="gd-stat__label">{label}</span>
      {link ? (
        <a className="gd-stat__value gd-link" href="#" onClick={(e) => e.preventDefault()}>
          {value}
        </a>
      ) : (
        <span className="gd-stat__value">{value}</span>
      )}
    </div>
  )
}

export default function GamePage() {
  const [tonConnectUI] = useTonConnectUI()
  const address = useTonAddress()
  const [gameFromNav, setGameFromNav] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const mediaRef = useRef(null)

  // Get game ID from URL query params
  const urlParams = new URLSearchParams(window.location.search)
  const gameIdFromUrl = urlParams.get('id')

  // Fetch game from API using the ID
  const { game: gameFromApi, loading: apiLoading, error } = useGameById(gameIdFromUrl)

  // Use navigation state as fallback (for instant display while API loads)
  useEffect(() => {
    const navState = getNavigationState()
    if (navState && navState.game) {
      setGameFromNav(navState.game)
      if (isDev) console.log('✅ GamePage - Using navigation state as fallback')
    }
  }, [])

  // Prefer API data over navigation state
  const game = gameFromApi || gameFromNav
  const loading = apiLoading && !gameFromNav

  const connectLabel = address ? `${address.slice(0, 4)}…${address.slice(-4)}` : 'CONNECT WALLET'

  const token = game?.tokens?.[0] || {}
  const gameName = game?.GameName || 'Night Hunter'
  const gameImage = game?.GameThumbnail || top1
  const gameURL = game?.GameURL || '#'
  const playCount = game?.playCount || 0
  const tokenSymbol = token.symbol || 'N/A'
  const tokenName = token.name || 'N/A'
  const tokenImage = token.imageUrl || token.image || null

  const embeddedUrl = useMemo(() => {
    if (!gameURL || gameURL === '#') return null
    try {
      const u = new URL(gameURL, window.location.origin)
      if (u.protocol !== 'http:' && u.protocol !== 'https:') return null
      return u.toString()
    } catch {
      return null
    }
  }, [gameURL])

  useEffect(() => {
    const sync = () => setIsFullscreen(Boolean(document.fullscreenElement))
    document.addEventListener('fullscreenchange', sync)
    sync()
    return () => document.removeEventListener('fullscreenchange', sync)
  }, [])

  const toggleFullscreen = async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen()
        return
      }
      if (mediaRef.current?.requestFullscreen) {
        await mediaRef.current.requestFullscreen()
      }
    } catch {
      // ignore
    }
  }

  return (
    <div className="page gd">
      <div className="page__bg-container">
        <img src={Bg01} alt="" className="page__main-bg" />
      </div>

      <header className="hero gd-hero">
        <div className="hero__topbar">
          <div className="nav-left">
            <button className="logo gd-logo-btn" type="button" onClick={() => navigate('/')}>
              GEMEPAD.FUN
            </button>
            <button className="btn-create" type="button">
              CREATE GAME
            </button>
          </div>

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

          <div className="nav-right">
            <button className="btn-p2e" type="button">
              PLAY TO EARN
            </button>
            <button className="btn-connect" type="button" onClick={() => tonConnectUI.openModal()}>
              {connectLabel}
            </button>
          </div>
        </div>
      </header>

      <main className="gd-main">
        <div className="gd-grid">
          <section className="gd-left" style={{ '--gd-hero-bg': `url("${heroBg}")` }}>
            <div className="gd-frame">
              <div className="gd-media" ref={mediaRef}>
                {loading ? (
                  <div style={{
                    width: '100%',
                    paddingTop: '100%',
                    background: 'linear-gradient(90deg, #1a1a2e 25%, #2a2a3e 50%, #1a1a2e 75%)',
                    backgroundSize: '200% 100%',
                    animation: 'loading 1.5s ease-in-out infinite'
                  }} />
                ) : isPlaying && embeddedUrl ? (
                  <iframe
                    className="gd-iframe"
                    src={embeddedUrl}
                    title={gameName}
                    loading="lazy"
                    allow="fullscreen; autoplay; clipboard-read; clipboard-write; gamepad"
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-pointer-lock allow-downloads"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <img src={gameImage} alt="Game cover" className="gd-media__img" />
                )}
              </div>
              {isPlaying && (
                <div className="gd-top-controls">
                  <button className="gd-control-btn" type="button" onClick={toggleFullscreen}>
                    {isFullscreen ? 'EXIT FULL' : 'FULL SCREEN'}
                  </button>
                  <button
                    className="gd-control-btn"
                    type="button"
                    onClick={async () => {
                      if (document.fullscreenElement) {
                        try {
                          await document.exitFullscreen()
                        } catch {
                          // ignore
                        }
                      }
                      setIsPlaying(false)
                    }}
                  >
                    EXIT
                  </button>
                </div>
              )}
              {!isPlaying && (
                <button
                  className="gd-play"
                  type="button"
                  onClick={() => {
                    if (loading) return
                    if (!embeddedUrl) return
                    setIsPlaying(true)
                  }}
                  disabled={loading || !embeddedUrl}
                  style={{ opacity: loading || !embeddedUrl ? 0.5 : 1 }}
                >
                  {loading ? 'LOADING...' : 'PLAY GAME'}
                </button>
              )}
            </div>
          </section>

          <aside className="gd-right">
            <div className="gd-panel">
              <div className="gd-panel__header">
                {loading ? (
                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'linear-gradient(90deg, #1a1a2e 25%, #2a2a3e 50%, #1a1a2e 75%)',
                    backgroundSize: '200% 100%',
                    animation: 'loading 1.5s ease-in-out infinite'
                  }} />
                ) : tokenImage ? (
                  <img src={tokenImage} alt={tokenSymbol} className="gd-avatar" />
                ) : (
                  <div className="gd-avatar" aria-hidden="true" />
                )}
                <div className="gd-title">
                  {loading ? (
                    <>
                      <div style={{
                        height: '24px',
                        width: '200px',
                        background: 'linear-gradient(90deg, #1a1a2e 25%, #2a2a3e 50%, #1a1a2e 75%)',
                        backgroundSize: '200% 100%',
                        animation: 'loading 1.5s ease-in-out infinite',
                        borderRadius: '4px',
                        marginBottom: '8px'
                      }} />
                      <div style={{
                        height: '16px',
                        width: '150px',
                        background: 'linear-gradient(90deg, #1a1a2e 25%, #2a2a3e 50%, #1a1a2e 75%)',
                        backgroundSize: '200% 100%',
                        animation: 'loading 1.5s ease-in-out infinite',
                        borderRadius: '4px'
                      }} />
                    </>
                  ) : (
                    <>
                      <div className="gd-title__name">{gameName}</div>
                      <div className="gd-title__sub">Token: {tokenSymbol} | {playCount} Players</div>
                    </>
                  )}
                </div>
              </div>

              <div className="gd-panel__scroll">
                {game?.GameDescription && (
                  <div className="gd-description">
                    {game.GameDescription}
                  </div>
                )}

                <div className="gd-progress">
                  <div className="gd-progress__top">
                    <span>Bonding curve progress: 75.1%</span>
                  </div>
                  <div className="gd-bar">
                    <div className="gd-bar__fill" style={{ width: '75%' }} />
                  </div>

                  <div className="gd-pillgrid">
                    <div className="gd-pill">
                      <div className="gd-pill__k">Hitting LP at</div>
                      <div className="gd-pill__v">$23,031.20</div>
                    </div>
                    <div className="gd-pill">
                      <div className="gd-pill__k">On fire at</div>
                      <div className="gd-pill__v">$41,921.39</div>
                    </div>
                    <div className="gd-pill">
                      <div className="gd-pill__k">Graduates at</div>
                      <div className="gd-pill__v">$60,815.66</div>
                    </div>
                  </div>
                </div>

                <div className="gd-stats">
                  <StatRow label="Token Symbol:" value={tokenSymbol} />
                  <StatRow label="Token Name:" value={tokenName} />
                  {token.mintPublicKey && (
                    <StatRow
                      label="Contract address:"
                      value={`${token.mintPublicKey.slice(0, 6)}...${token.mintPublicKey.slice(-6)}`}
                      link
                    />
                  )}
                  {token.chain && <StatRow label="Chain:" value={token.chain.toUpperCase()} />}
                  <StatRow label="Play Count:" value={playCount.toLocaleString()} />
                  {game?.p2eEligibility?.eligible && <StatRow label="P2E Eligible:" value="Yes" />}
                </div>

                <div className="gd-trade">
                  <div className="gd-tabs">
                    <button className="gd-tab gd-tab--active" type="button">
                      Buy
                    </button>
                    <button className="gd-tab" type="button">
                      Sell
                    </button>
                  </div>

                  <div className="gd-form">
                    <label className="gd-field">
                      <span>Amount</span>
                      <input defaultValue="2.5" />
                    </label>
                    <label className="gd-field">
                      <span>Slippage %</span>
                      <input defaultValue="2" />
                    </label>
                    <div className="gd-receive">You’ll receive $$$</div>
                    <button className="gd-cta" type="button">
                      CREATE GAME
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>

        <section className="panel">
          <div className="section-header">
            <div>
              <p className="eyebrow">Top Launches</p>
              <h2>Fresh drops</h2>
            </div>
            <button className="pill pill-dark">View all ➜</button>
          </div>
          <div className="card-row">
            {topLaunches.map((game) => (
              <GameCard key={game.title} title={game.title} img={game.img} />
            ))}
          </div>
        </section>
      </main>


    </div>
  )
}
