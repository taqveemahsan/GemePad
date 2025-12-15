import React, { useCallback, useMemo } from 'react'
import { useTonConnectUI, useTonWallet } from '@tonconnect/ui-react'
import { navigate } from '../../navigation'
import Bg01 from '../../assets/herosection/Bg01.png'
import heroBg from '../../assets/hero.png' 

// TODO: Replace with real Uniswap hero image when you provide assets
import heroUniswap from '../../assets/explore/UNISWAP WORLD_Right_Side.png'

import g1 from '../../assets/explore/1.png'
import g2 from '../../assets/explore/2.png'
import g3 from '../../assets/explore/3.png'
import g4 from '../../assets/explore/4.png'
import g5 from '../../assets/explore/5.png'
import g6 from '../../assets/explore/6.png'
import g7 from '../../assets/explore/7.png'
import g8 from '../../assets/explore/8.png'
import g9 from '../../assets/explore/9.png'

const uniswapGames = [
  { id: 'uniswap-1', title: 'GAME NAME HERE', img: g1 },
  { id: 'uniswap-2', title: 'GAME NAME HERE', img: g2 },
  { id: 'uniswap-3', title: 'GAME NAME HERE', img: g3 },
  { id: 'uniswap-4', title: 'GAME NAME HERE', img: g4 },
  { id: 'uniswap-5', title: 'GAME NAME HERE', img: g5 },
  { id: 'uniswap-6', title: 'GAME NAME HERE', img: g6 },
  { id: 'uniswap-7', title: 'GAME NAME HERE', img: g7 },
  { id: 'uniswap-8', title: 'GAME NAME HERE', img: g8 },
  { id: 'uniswap-9', title: 'GAME NAME HERE', img: g9 },
  { id: 'uniswap-10', title: 'GAME NAME HERE', img: g1 },
  { id: 'uniswap-11', title: 'GAME NAME HERE', img: g2 },
  { id: 'uniswap-12', title: 'GAME NAME HERE', img: g3 },
]

function UniswapGameCard({ game, onClick }) {
  return (
    <button type="button" className="usw-card" onClick={onClick}>
      <div className="usw-card__media">
        <img src={game.img} alt={game.title} loading="lazy" decoding="async" />
        <div className="usw-card__badge">12k Players</div>
      </div>
      <div className="usw-card__body">
        <div className="usw-card__title">{game.title}</div>
        <div className="usw-card__pill">▶ PLAY</div>
      </div>
    </button>
  )
}

export default function UniswapWorld() {
  const [tonConnectUI] = useTonConnectUI()
  const wallet = useTonWallet()

  const connectLabel = useMemo(() => {
    const addr = wallet?.account?.address
    return addr ? `${addr.slice(0, 4)}…${addr.slice(-4)}` : 'CONNECT WALLET'
  }, [wallet?.account?.address])

  const onGameClick = useCallback((game) => {
    navigate(`/game?id=${game.id}`, {
      game: { id: game.id, gameId: game.id, GameName: game.title, GameThumbnail: game.img, GameURL: '#' },
    })
  }, [])

  return (
    <div className="page usw">
      <div className="page__bg-container">
        <img src={Bg01} alt="" className="page__main-bg usw__bg" loading="lazy" decoding="async" />
      </div>

      <header className="hero usw-hero">
        <div className="hero__topbar">
          <div className="nav-left">
            <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
              GEMEPAD.FUN
            </div>
            <button className="btn-create" type="button">
              CREATE GAME
            </button>
          </div>

          <div className="search">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

        <div className="usw-hero__frame" style={{ '--usw-hero-bg': `url("${heroBg}")` }}>
          <div className="usw-hero__inner">
            <div className="usw-hero__left">
              <div className="usw-hero__title">UNISWAP WORLD</div>
              <div className="usw-hero__desc">
                Lorem ipsum dolor sit amet consectetur. Pulvinar egestas nec et egestas eu odio amet iaculis auctor. Rutrum sit aliquam id iaculis morbi quis ut enim.
              </div>
              <button className="usw-hero__cta" type="button">
                CREATE YOU OWN UNISWAP GAME
              </button>
            </div>
            <div className="usw-hero__right" aria-hidden="true">
              <img className="usw-hero__main" src={heroUniswap} alt="" loading="eager" decoding="async" fetchPriority="high" />
            </div>
          </div>
        </div>
      </header>

      <main className="usw-main">
        <div className="usw-section">
          <div className="usw-section__title">
            TOP <span className="usw-section__accent">UNISWAP GAMES</span>
          </div>
          <div className="usw-grid">
            {uniswapGames.map((g) => (
              <UniswapGameCard key={g.id} game={g} onClick={() => onGameClick(g)} />
            ))}
          </div>
        </div>


      </main>

      <style jsx>{`
        .usw__bg {
          position: fixed;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.75;
        }

        .usw-hero {
          padding: 10px 16px 60px;
        }

        .usw-hero__frame {
          --usw-cyan: #00d1ff;
          --usw-cut: 60px;
          --usw-cut-inner: 58px;
          width: 100%;
          margin: 14px auto 0;
          position: relative;
          padding: 2px;
          overflow: hidden;
          background: linear-gradient(
            90deg,
            color-mix(in oklab, var(--usw-cyan), #ffffff 10%),
            color-mix(in oklab, var(--usw-cyan), #8d3cff 16%)
          );
          clip-path: polygon(
            var(--usw-cut) 0,
            100% 0,
            100% calc(100% - var(--usw-cut)),
            calc(100% - var(--usw-cut)) 100%,
            0 100%,
            0 var(--usw-cut)
          );
        }
        .usw-hero__frame::before {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--usw-hero-bg);
          background-size: cover;
          background-position: center;
          opacity: 0.5;
          filter: saturate(1.1);
          clip-path: inherit;
        }
        .usw-hero__inner {
          position: relative;
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          gap: 24px;
          padding: 32px 34px;
          background: linear-gradient(90deg, rgba(10, 10, 24, 0.86), rgba(10, 10, 24, 0.56));
          clip-path: polygon(
            var(--usw-cut-inner) 0,
            100% 0,
            100% calc(100% - var(--usw-cut-inner)),
            calc(100% - var(--usw-cut-inner)) 100%,
            0 100%,
            0 var(--usw-cut-inner)
          );
          align-items: center;
        }
        .usw-hero__left {
          max-width: 560px;
        }
        .usw-hero__title {
          font-family: 'Press Start 2P', cursive;
          font-size: 44px;
          color: var(--usw-cyan);
          letter-spacing: 0.04em;
          text-shadow: 0 0 14px color-mix(in oklab, var(--usw-cyan), transparent 65%);
        }
        .usw-hero__desc {
          margin-top: 16px;
          font-size: 13px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.78);
          max-width: 520px;
        }
        .usw-hero__cta {
          margin-top: 18px;
          border: 0;
          border-radius: 999px;
          padding: 10px 18px;
          background: linear-gradient(90deg, #c433ff, #ff3aff);
          color: #fff;
          font-weight: 800;
          font-size: 11px;
          cursor: pointer;
        }
        .usw-hero__right {
          display: flex;
          align-items: flex-end;
          justify-content: flex-end;
          min-height: 220px;
        }
        .usw-hero__main {
          height: 250px;
          width: auto;
          object-fit: contain;
          max-width: min(520px, 100%);
        }

        .usw-main {
          padding: 0 16px 60px;
        }

        .usw-section {
          max-width: 1600px;
          margin: 0 auto;
        }
        .usw-section__title {
          font-family: 'Press Start 2P', cursive;
          font-size: 18px;
          margin: 18px 0 16px;
          letter-spacing: 0.04em;
        }
        .usw-section__accent {
          color: #ff3aff;
        }

        .usw-grid {
          display: grid;
          grid-template-columns: repeat(6, minmax(0, 1fr));
          gap: 14px;
        }

        .usw-card {
          border: 0;
          padding: 0;
          text-align: left;
          cursor: pointer;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 18px;
          overflow: hidden;
          transition: transform 160ms ease, filter 160ms ease;
        }
        .usw-card:hover {
          transform: translateY(-4px);
          filter: brightness(1.06);
        }
        .usw-card__media {
          position: relative;
          aspect-ratio: 1 / 1;
          overflow: hidden;
        }
        .usw-card__media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .usw-card__badge {
          position: absolute;
          top: 10px;
          right: 10px;
          font-size: 11px;
          font-weight: 800;
          padding: 6px 10px;
          border-radius: 999px;
          background: rgba(0, 0, 0, 0.45);
          color: #fff;
        }
        .usw-card__body {
          padding: 10px 12px 12px;
          display: grid;
          gap: 10px;
        }
        .usw-card__title {
          font-family: 'Press Start 2P', cursive;
          font-size: 12px;
          letter-spacing: 0.03em;
          color: #ff3aff;
          text-transform: uppercase;
        }
        .usw-card__pill {
          height: 34px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          background: linear-gradient(90deg, #6c63ff, #ff3aff);
          font-weight: 900;
          font-size: 12px;
          color: #fff;
        }


      `}</style>
    </div>
  )
}

