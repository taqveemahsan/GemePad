import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useTonConnectUI, useTonWallet } from '@tonconnect/ui-react'
import heroBg from './assets/herosection/Mask group (3).png'
import Bg01 from './assets/herosection/Bg01.png'
import heroBot from './assets/herosection/Hero_Right_side.png'
import heroTitleImg from './assets/herosection/GEMEPAD.png'
import top1 from './assets/toplaunches/Frame 48.png'
import top2 from './assets/toplaunches/Frame 51.png'
import top3 from './assets/toplaunches/Frame 52.png'
import top4 from './assets/toplaunches/Frame 53.png'
import top5 from './assets/toplaunches/Frame 54.png'
import top6 from './assets/toplaunches/Frame 55.png'
import pepeHero from './assets/pepegames/Gemini_Generated_Image_betzqrbetzqrbetz 1.png'
import pepeTitle from './assets/pepegames/PEPE Games.png'
import pepeCard1 from './assets/pepegames/Frame 62-card1.png'
import pepeCard2 from './assets/pepegames/Frame 62-card2.png'
import pepeCard3 from './assets/pepegames/Frame 62-card3.png'
import pepeCard4 from './assets/pepegames/Frame 62-card4.png'
import pepeCard5 from './assets/pepegames/Frame 62-card5.png'
import dogeHero from './assets/dogegames/Gemini_Generated_Image_kpdih6kpdih6kpdi 1.png'
import dogeTitle from './assets/dogegames/Doge Games.png'
import dogeCard1 from './assets/dogegames/Frame 64-card1.png'
import dogeCard2 from './assets/dogegames/Frame 64-card2.png'
import dogeCard3 from './assets/dogegames/Frame 64-card3.png'
import dogeCard4 from './assets/dogegames/Frame 64-card4.png'
import uniHero from './assets/uniiswapworld/Gemini_Generated_Image_mdzxh1mdzxh1mdzx 1.png'
import metaHero from './assets/metamask/Metamask_Hero.png'
import sushiHero from './assets/sushiswapworld/SUSHISWAP_Hero.png'
import explore1 from './assets/explore/1.png'
import explore2 from './assets/explore/2.png'
import explore3 from './assets/explore/3.png'
import explore4 from './assets/explore/4.png'
import explore5 from './assets/explore/5.png'
import explore6 from './assets/explore/6.png'
import explore7 from './assets/explore/7.png'
import explore8 from './assets/explore/8.png'
import explore9 from './assets/explore/9.png'
import { navigate } from './navigation'
import { useGames } from './hooks/useGames'

const isDev = import.meta?.env?.DEV

const chips = ['Token', 'P2E', 'Mini-app', 'Pair-Launch', 'No Code', 'No Tools', 'No Time']

const topLaunches = [
  { title: 'Uncharted 4', img: top1 },
  { title: 'Elden Ring', img: top2 },
  { title: 'Spider-Man 2', img: top3 },
  { title: 'Horizon', img: top4 },
  { title: 'Ghosts', img: top5 },
  { title: 'Final Fantasy', img: top6 },
]

const memeSections = [
  {
    id: 'uniswap',
    theme: 'uniswap',
    label: 'UniSwap Games',
    titleText: 'UNISWAP GAMES',
    titleImg: null,
    heroImg: uniHero,
    cards: [explore1, explore2, explore3, explore4, explore5],
    glow: 'rgba(104, 210, 255, 0.35)',
  },
  {
    id: 'metamask',
    theme: 'metamask',
    label: 'MetaMask Games',
    titleText: 'METAMASK GAMES',
    titleImg: null,
    heroImg: metaHero,
    cards: [explore6, explore7, explore8, explore9, explore1],
    glow: 'rgba(255, 133, 33, 0.35)',
  },
  {
    id: 'pepe',
    theme: 'pepe',
    label: 'Pepe Games',
    titleImg: pepeTitle,
    heroImg: pepeHero,
    cards: [pepeCard1, pepeCard2, pepeCard3, pepeCard4, pepeCard5],
    glow: 'rgba(62, 244, 192, 0.4)',
  },
  {
    id: 'doge',
    theme: 'doge',
    label: 'Doge Games',
    titleImg: dogeTitle,
    heroImg: dogeHero,
    cards: [dogeCard1, dogeCard2, dogeCard3, dogeCard4],
    glow: 'rgba(255, 191, 0, 0.4)',
  },
  {
    id: 'sushiswap',
    theme: 'sushiswap',
    label: 'SushiSwap Games',
    titleText: 'SUSHISWAP GAMES',
    titleImg: null,
    heroImg: sushiHero,
    cards: [explore2, explore4, explore6, explore8, explore9],
    glow: 'rgba(120, 136, 255, 0.35)',
  },
]

const leaderboardRows = [
  {
    game: 'Game Name Here',
    gameIcon: top1,
    dateTime: '11/28/2025 - 07:23:31 AM',
    wallet: 'GD673R46R....GF6F',
    score: '8964',
    rewards: '10.00',
  },
  {
    game: 'Game Name Here',
    gameIcon: top2,
    dateTime: '11/28/2025 - 07:23:31 AM',
    wallet: 'GD673R46R....GF6F',
    score: '8964',
    rewards: '10.00',
  },
  {
    game: 'Game Name Here',
    gameIcon: top3,
    dateTime: '11/28/2025 - 07:23:31 AM',
    wallet: 'GD673R46R....GF6F',
    score: '8964',
    rewards: '10.00',
  },
  {
    game: 'Game Name Here',
    gameIcon: top4,
    dateTime: '11/28/2025 - 07:23:31 AM',
    wallet: 'GD673R46R....GF6F',
    score: '8964',
    rewards: '10.00',
  },
  {
    game: 'Game Name Here',
    gameIcon: top5,
    dateTime: '11/28/2025 - 07:23:31 AM',
    wallet: 'GD673R46R....GF6F',
    score: '8964',
    rewards: '10.00',
  },
]

const topPlayers = [
  { id: 'Gb', wallet: 'GD673R46R....GF6F', color: '#a855f7' },
  { id: 'Zx', wallet: 'GD673R46R....GF6F', color: '#8b5cf6' },
  { id: 'Bg', wallet: 'GD673R46R....GF6F', color: '#7c3aed' },
  { id: 'Tr', wallet: 'GD673R46R....GF6F', color: '#6366f1' },
  { id: 'Rd', wallet: 'GD673R46R....GF6F', color: '#ec4899' },
  { id: 'Se', wallet: 'GD673R46R....GF6F', color: '#d946ef' },
]

function TagChip({ label }) {
  return <span className="chip">{label}</span>
}

function LoadingCard() {
  return (
    <div className="game-card" style={{ opacity: 0.6 }}>
      <div className="game-card__media" style={{ background: 'linear-gradient(90deg, #1a1a2e 25%, #2a2a3e 50%, #1a1a2e 75%)', backgroundSize: '200% 100%', animation: 'loading 1.5s ease-in-out infinite' }}>
        <div style={{ paddingTop: '100%' }} />
      </div>
      <div className="game-card__body">
        <div style={{ height: '20px', background: 'linear-gradient(90deg, #1a1a2e 25%, #2a2a3e 50%, #1a1a2e 75%)', backgroundSize: '200% 100%', animation: 'loading 1.5s ease-in-out infinite', borderRadius: '4px', marginBottom: '10px' }} />
        <div style={{ height: '16px', background: 'linear-gradient(90deg, #1a1a2e 25%, #2a2a3e 50%, #1a1a2e 75%)', backgroundSize: '200% 100%', animation: 'loading 1.5s ease-in-out infinite', borderRadius: '4px', width: '60%', marginBottom: '10px' }} />
        <div style={{ height: '36px', background: 'linear-gradient(90deg, #1a1a2e 25%, #2a2a3e 50%, #1a1a2e 75%)', backgroundSize: '200% 100%', animation: 'loading 1.5s ease-in-out infinite', borderRadius: '4px' }} />
      </div>
    </div>
  )
}

const GameCard = React.memo(function GameCard({ title, img, tokenName, tokenImg, onClick, playCount, imgLoading = 'lazy', imgFetchPriority }) {
  return (
    <div className="game-card">
      <div className="game-card__media">
        <img src={img} alt={title} loading={imgLoading} decoding="async" fetchPriority={imgFetchPriority} />
        <div className="badge">{playCount ? `${playCount} Players` : '12k Players'}</div>
      </div>
      <div className="game-card__body">
        <h4>{title}</h4>
        {tokenName && (
          <div className="game-card__info">
            {tokenImg && <img src={tokenImg} alt={tokenName} />}
            <span>{tokenName}</span>
            <span>$0.058</span>
          </div>
        )}
        <button className="btn-play" type="button" onClick={onClick}>
          ▶ PLAY
        </button>
      </div>
    </div>
  )
})

function LazyRender({ children, minHeight = 600, rootMargin = '800px' }) {
  const containerRef = useRef(null)
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    if (shouldRender) return
    const el = containerRef.current
    if (!el) return

    if (!('IntersectionObserver' in window)) {
      setShouldRender(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry?.isIntersecting) {
          setShouldRender(true)
          observer.disconnect()
        }
      },
      { root: null, rootMargin, threshold: 0.01 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [rootMargin, shouldRender])

  return (
    <div ref={containerRef} style={!shouldRender ? { minHeight } : undefined}>
      {shouldRender ? children : null}
    </div>
  )
}

const MemeSection = React.memo(function MemeSection({ section }) {
  const handleStaticGameClick = useCallback((cardImg, idx) => {
    // Create dummy game data for static cards
    const dummyGame = {
      id: `${section.id}-${idx}`,
      gameId: `${section.id}-${idx}`,
      GameName: 'Coming Soon',
      GameDescription: 'This game is coming soon! Stay tuned for updates.',
      GameThumbnail: cardImg,
      GameURL: '#',
      playCount: Math.floor(Math.random() * 10000) + 1000,
      tokens: [
        {
          name: 'Game Token',
          symbol: 'GAME',
          imageUrl: null,
        }
      ],
      p2eEligibility: {
        eligible: false
      }
    }
    navigate(`/game?id=${dummyGame.id}`, { game: dummyGame })
  }, [section.id])

  return (
    <section id={section.id} className={`meme-panel ${section.theme}-section ${section.id}-section`}>
      <div className="meme-panel__wrapper">
        <div className="meme-panel__frame">
          <div className="meme-panel__body">
            <div className="meme-panel__header">
              <div className="meme-panel__header-left">
                {section.titleImg ? (
                  <img src={section.titleImg} alt={section.label} className="meme-title" />
                ) : (
                  <h2 className={`meme-title-text meme-title-text--${section.theme}`}>{section.titleText || section.label}</h2>
                )}
                <button className="meme-panel__view-all">View all ›</button>
              </div>
            </div>
            <div className="meme-panel__cards">
              {section.cards.slice(0, 4).map((card, idx) => (
                <GameCard
                  key={idx}
                  title="GAME NAME HERE"
                  img={card}
                  tokenName="Token Name"
                  tokenImg={null}
                  playCount={null}
                  imgLoading="lazy"
                  onClick={() => handleStaticGameClick(card, idx)}
                />
              ))}
            </div>
            <div className="meme-panel__progress">
              <div className="progress-bar">
                <div className="progress-bar__fill"></div>
              </div>
            </div>
          </div>
          <div className="meme-panel__art" aria-hidden="true">
            <img src={section.heroImg} alt="" loading="lazy" decoding="async" />
          </div>
        </div>
      </div>
    </section>
  )
})

export default function App() {
  const [tonConnectUI] = useTonConnectUI()
  const wallet = useTonWallet()
  const [heroBgEnabled, setHeroBgEnabled] = useState(false)
  
  // Dynamic import for footer background to ensure it works in build
  // Assuming Component_Bg.png is in src/assets/
  const footerBg = new URL('./assets/Component_Bg.png', import.meta.url).href

  const { games, loading, error } = useGames({
    category: 'play-to-earn',
    sortBy: 'desc',
    page: 1,
    limit: 12,
  })

  useEffect(() => {
    let cancelled = false
    if (typeof window === 'undefined') return

    const enable = () => {
      if (!cancelled) setHeroBgEnabled(true)
    }

    if (window.requestIdleCallback) {
      const id = window.requestIdleCallback(enable, { timeout: 1500 })
      return () => {
        cancelled = true
        window.cancelIdleCallback?.(id)
      }
    }

    const t = window.setTimeout(enable, 0)
    return () => {
      cancelled = true
      window.clearTimeout(t)
    }
  }, [])

  const connectLabel = wallet?.account?.address
    ? `${wallet.account.address.slice(0, 4)}…${wallet.account.address.slice(-4)}`
    : 'CONNECT WALLET'

  const handleGameClick = useCallback((game) => {
    if (isDev) console.log('🎮 Game Clicked:', game)
    navigate(`/game?id=${game.id || game.gameId}`, { game })
  }, [])

  return (
    <div className="page">
      <div className="page__bg-container">
        <img src={Bg01} alt="" className="page__main-bg" loading="lazy" decoding="async" fetchPriority="low" />
      </div>

      <header className="hero">
        <div className="hero__topbar">
          {/* Left Group */}
          <div className="nav-left">
            <div className="logo">GEMEPAD.FUN</div>
            <button className="btn-create">CREATE GAME</button>
          </div>

          {/* Center */}
          <div className="search">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input type="text" placeholder="Search games here..." />
          </div>

          {/* Right Group */}
          <div className="nav-right">
            <button className="btn-p2e">PLAY TO EARN</button>
            <button
              className="btn-connect"
              type="button"
              onClick={() => tonConnectUI.openModal()}
            >
              {connectLabel}
            </button>
          </div>
        </div>

        <div className="hero__frame" style={{ '--hero-bg': heroBgEnabled ? `url("${heroBg}")` : 'none' }}>
          <div className="hero__chips-container">
            {chips.map((chip, idx) => (
              <div key={chip} className={`hero-chip chip-${idx}`}>{chip}</div>
            ))}
          </div>
          <div className="hero__content">
            <div className="hero__center">
              <div className="hero__title-large">
                <img src={heroTitleImg} alt="GEMEPAD" className="hero-title-img" decoding="async" fetchPriority="high" />
              </div>
              <div className="hero__cta-container">
                <button className="btn-cta-main">
                  MAKE A GAME IN 5 MIN
                  <span className="sub-text">DEPLOY ON TON, PLAY ON TELEGRAM</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Robot moved OUTSIDE frame to be "sb sa uper" */}
        <img src={heroBot} alt="Robot" className="hero__bot-large" decoding="async" fetchPriority="high" />
      </header>

      <main className="content">
        <section className="top-launches-section">
          <div className="section-header">
            <h2 className="section-title-pixel">
              TOP <span className="text-purple">LAUNCHES</span>
            </h2>
            <button className="pill pill-dark">View all ➜</button>
          </div>
          <div className="card-row">
            {loading ? (
              Array.from({ length: 6 }).map((_, idx) => <LoadingCard key={idx} />)
            ) : games.length > 0 ? (
              games.slice(0, 6).map((game, idx) => (
                <GameCard
                  key={game.id || game.gameId || idx}
                  title={game.GameName}
                  img={game.GameThumbnail}
                  tokenName={game.tokens && game.tokens[0] ? game.tokens[0].name : null}
                  tokenImg={game.tokens && game.tokens[0] ? game.tokens[0].imageUrl : null}
                  playCount={game.playCount}
                  onClick={() => handleGameClick(game)}
                  imgLoading="eager"
                />
              ))
            ) : (
              <div style={{ padding: '2rem', textAlign: 'center', color: '#888' }}>No games available</div>
            )}
          </div>
        </section>

        <section className="geme-world-header">
          <div className="geme-world-header__title">
            <span className="text-white">GEME</span>
            <span className="text-purple">WORLD</span>
          </div>
          <p className="geme-world-header__description">
            Explore Geme Worlds like Pepe, Doge, Bonk & more — each with its own style, characters and unique mini-games to play.
          </p>
          <button className="btn-explore-worlds" onClick={() => navigate('/explore')}>EXPLORE ALL WORLDS</button>
        </section>

        {memeSections.map((section) => (
          <LazyRender key={section.id} minHeight={900}>
            <MemeSection section={section} />
          </LazyRender>
        ))}

        <LazyRender minHeight={900}>
          <section className="leaderboard-section">
            <div className="leaderboard-header">
              <h2 className="leaderboard-title">
                LEADER<span className="text-purple">BOARD</span>
              </h2>
              <p className="leaderboard-description">
                Lorem ipsum dolor sit amet consectetur. Tellus magna habitant eleifend velit odio sem. Arcu neque nibh vitae eu et feugiat vel a nullam.
              </p>
            </div>

            <div className="leaderboard-container" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url("${footerBg}")` }}>
              <div className="leaderboard-table-wrapper">
                <table className="leaderboard-table">
                  <thead>
                    <tr>
                      <th>Game</th>
                      <th>Date & Time</th>
                      <th>Wallet Address</th>
                      <th>Score</th>
                      <th>Rewards</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboardRows.map((row, idx) => (
                      <tr key={idx}>
                        <td>
                          <div className="game-cell">
                            <img src={row.gameIcon} alt={row.game} className="game-icon" />
                            <span>{row.game}</span>
                          </div>
                        </td>
                        <td>{row.dateTime}</td>
                        <td>{row.wallet}</td>
                        <td>
                          <span className="score-badge">{row.score}</span>
                        </td>
                        <td>
                          <div className="rewards-cell">
                            <span className="reward-icon">$</span>
                            <span>{row.rewards}</span>
                          </div>
                        </td>
                        <td>
                          <button className="action-btn">⋯</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="pagination">
                  <button className="pagination-btn">‹</button>
                  <button className="pagination-btn active">1</button>
                  <button className="pagination-btn">2</button>
                  <button className="pagination-btn">3</button>
                  <button className="pagination-btn">4</button>
                  <button className="pagination-btn">5</button>
                  <span className="pagination-dots">...</span>
                  <button className="pagination-btn">22</button>
                  <button className="pagination-btn">›</button>
                  <span className="pagination-info">20 / 432</span>
                </div>
              </div>

              <div className="top-player-panel">
                <h3 className="top-player-title">
                  TOP <span className="text-purple">PLAYER</span>
                  <br />
                  <span className="top-player-subtitle">OF ALL TIME</span>
                </h3>
                <div className="top-players-list">
                  {topPlayers.map((player) => (
                    <div key={player.id} className="top-player-item">
                      <div className="player-avatar" style={{ background: player.color }}>
                        {player.id}
                      </div>
                      <span className="player-wallet">{player.wallet}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </LazyRender>
      </main>

      <footer className="footer-section" style={{ backgroundImage: `url("${footerBg}")` }}>
        <div className="footer-inner">
          <div className="footer__container">
            <div className="footer__left">
              <h2 className="footer__logo">GEMEPAD.FUN</h2>
              <p className="footer__description">
                Lorem ipsum dolor sit amet consectetur. Neque dolor non amet ullamcorper nullam nunc in diam. In eu quis in ultrices ullamcorper
              </p>
              <div className="footer__social">
                <a href="#" className="social-icon" aria-label="Instagram">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
                <a href="#" className="social-icon" aria-label="Discord">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/></svg>
                </a>
                <a href="#" className="social-icon" aria-label="LinkedIn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
                <a href="#" className="social-icon" aria-label="Twitter">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a href="#" className="social-icon" aria-label="Facebook">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </a>
                <a href="#" className="social-icon" aria-label="WhatsApp">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                </a>
              </div>
            </div>

            <div className="footer__columns">
              <div className="footer__column">
                <h3 className="footer__column-title">Sections</h3>
                <ul className="footer__links">
                  <li><a href="#">Home</a></li>
                  <li><a href="#">How it Works</a></li>
                  <li><a href="#">Key Features</a></li>
                </ul>
              </div>

              <div className="footer__column">
                <h3 className="footer__column-title">Sections</h3>
                <ul className="footer__links">
                  <li><a href="#">Platforms</a></li>
                  <li><a href="#">Subscription</a></li>
                  <li><a href="#">Testimonials</a></li>
                </ul>
              </div>

              <div className="footer__column">
                <h3 className="footer__column-title">Company</h3>
                <ul className="footer__links">
                  <li><a href="#">About</a></li>
                  <li><a href="#">Careers</a></li>
                  <li><a href="#">Contact</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="footer__bottom">
            <p className="footer__copyright">© 2010-2025 GemePadFun. All rights reserved</p>
            <div className="footer__legal">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Cookies Settings</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
