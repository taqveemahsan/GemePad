import React, { useCallback, useMemo } from 'react'
import { useTonConnectUI, useTonWallet } from '@tonconnect/ui-react'
import { navigate } from '../../navigation'
import Bg01 from '../../assets/herosection/Bg01.png'
import heroBg from '../../assets/hero.png'

// TODO: Replace with real Phantom hero image when you provide assets
import heroPhantom from '../../assets/explore/PHANTOM WORLD_Right_Side.png'

import g1 from '../../assets/explore/1.png'
import g2 from '../../assets/explore/2.png'
import g3 from '../../assets/explore/3.png'
import g4 from '../../assets/explore/4.png'
import g5 from '../../assets/explore/5.png'
import g6 from '../../assets/explore/6.png'
import g7 from '../../assets/explore/7.png'
import g8 from '../../assets/explore/8.png'
import g9 from '../../assets/explore/9.png'

const phantomGames = [
  { id: 'phantom-1', title: 'GAME NAME HERE', img: g1 },
  { id: 'phantom-2', title: 'GAME NAME HERE', img: g2 },
  { id: 'phantom-3', title: 'GAME NAME HERE', img: g3 },
  { id: 'phantom-4', title: 'GAME NAME HERE', img: g4 },
  { id: 'phantom-5', title: 'GAME NAME HERE', img: g5 },
  { id: 'phantom-6', title: 'GAME NAME HERE', img: g6 },
  { id: 'phantom-7', title: 'GAME NAME HERE', img: g7 },
  { id: 'phantom-8', title: 'GAME NAME HERE', img: g8 },
  { id: 'phantom-9', title: 'GAME NAME HERE', img: g9 },
  { id: 'phantom-10', title: 'GAME NAME HERE', img: g1 },
  { id: 'phantom-11', title: 'GAME NAME HERE', img: g2 },
  { id: 'phantom-12', title: 'GAME NAME HERE', img: g3 },
]

function PhantomGameCard({ game, onClick }) {
  return (
    <button type="button" className="phw-card" onClick={onClick}>
      <div className="phw-card__media">
        <img src={game.img} alt={game.title} loading="lazy" decoding="async" />
        <div className="phw-card__badge">12k Players</div>
      </div>
      <div className="phw-card__body">
        <div className="phw-card__title">{game.title}</div>
        <div className="phw-card__pill">▶ PLAY</div>
      </div>
    </button>
  )
}

export default function PhantomWorld() {
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
    <div className="page phw">
      <div className="page__bg-container">
        <img src={Bg01} alt="" className="page__main-bg phw__bg" loading="lazy" decoding="async" />
      </div>

      <header className="hero phw-hero">
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

        <div className="phw-hero__frame" style={{ '--phw-hero-bg': `url("${heroBg}")` }}>
          <div className="phw-hero__inner">
            <div className="phw-hero__left">
              <div className="phw-hero__title">PHANTOM WORLD</div>
              <div className="phw-hero__desc">
                Lorem ipsum dolor sit amet consectetur. Pulvinar egestas nec et egestas eu odio amet iaculis auctor. Rutrum sit aliquam id iaculis morbi quis ut enim.
              </div>
              <button className="phw-hero__cta" type="button">
                CREATE YOU OWN PHANTOM GAME
              </button>
            </div>
            <div className="phw-hero__right" aria-hidden="true">
              {/* <img className="phw-hero__side" src={heroPhantom} alt="" loading="lazy" decoding="async" /> */}
              <img className="phw-hero__main" src={heroPhantom} alt="" loading="eager" decoding="async" fetchPriority="high" />
              {/* <img className="phw-hero__side phw-hero__side--r" src={heroPhantom} alt="" loading="lazy" decoding="async" /> */}
            </div>
          </div>
        </div>
      </header>

      <main className="phw-main">
        <div className="phw-section">
          <div className="phw-section__title">
            TOP <span className="phw-section__accent">PHANTOM GAMES</span>
          </div>
          <div className="phw-grid">
            {phantomGames.map((g) => (
              <PhantomGameCard key={g.id} game={g} onClick={() => onGameClick(g)} />
            ))}
          </div>
        </div>


      </main>

      <style jsx>{`
        .phw__bg {
          position: fixed;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.75;
        }

        .phw-hero {
          padding: 10px 16px 60px;
        }

        .phw-hero__frame {
          --phw-pink: #ff69b4;
          --phw-cut: 60px;
          --phw-cut-inner: 58px;
          width: 100%;
          margin: 14px auto 0;
          position: relative;
          padding: 2px;
          overflow: hidden;
          background: linear-gradient(
            90deg,
            color-mix(in oklab, var(--phw-pink), #ffffff 8%),
            color-mix(in oklab, var(--phw-pink), #8d3cff 20%)
          );
          clip-path: polygon(
            var(--phw-cut) 0,
            100% 0,
            100% calc(100% - var(--phw-cut)),
            calc(100% - var(--phw-cut)) 100%,
            0 100%,
            0 var(--phw-cut)
          );
        }
        .phw-hero__frame::before {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--phw-hero-bg);
          background-size: cover;
          background-position: center;
          opacity: 0.5;
          filter: saturate(1.1);
          clip-path: inherit;
        }
        .phw-hero__inner {
          position: relative;
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          gap: 24px;
          padding: 32px 34px;
          background: linear-gradient(90deg, rgba(10, 10, 24, 0.86), rgba(10, 10, 24, 0.56));
          clip-path: polygon(
            var(--phw-cut-inner) 0,
            100% 0,
            100% calc(100% - var(--phw-cut-inner)),
            calc(100% - var(--phw-cut-inner)) 100%,
            0 100%,
            0 var(--phw-cut-inner)
          );
        }
        .phw-hero__left {
          max-width: 560px;
        }
        .phw-hero__title {
          font-family: 'Press Start 2P', cursive;
          font-size: 44px;
          color: var(--phw-pink);
          letter-spacing: 0.04em;
          text-shadow: 0 0 14px color-mix(in oklab, var(--phw-pink), transparent 65%);
        }
        .phw-hero__desc {
          margin-top: 16px;
          font-size: 13px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.78);
          max-width: 520px;
        }
        .phw-hero__cta {
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
        .phw-hero__right {
          position: relative;
          min-height: 220px;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          gap: 18px;
        }
        .phw-hero__main {
          height: 240px;
          width: auto;
          object-fit: contain;
        }
        .phw-hero__side {
          height: 210px;
          width: auto;
          opacity: 0.9;
          object-fit: contain;
        }
        .phw-hero__side--r {
          transform: scaleX(-1);
        }

        .phw-main {
          padding: 0 16px 60px;
        }

        .phw-section {
          max-width: 1600px;
          margin: 0 auto;
        }
        .phw-section__title {
          font-family: 'Press Start 2P', cursive;
          font-size: 18px;
          margin: 18px 0 16px;
          letter-spacing: 0.04em;
        }
        .phw-section__accent {
          color: #ff3aff;
        }

        .phw-grid {
          display: grid;
          grid-template-columns: repeat(6, minmax(0, 1fr));
          gap: 14px;
        }

        .phw-card {
          border: 0;
          padding: 0;
          text-align: left;
          cursor: pointer;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 18px;
          overflow: hidden;
          transition: transform 160ms ease, filter 160ms ease;
        }
        .phw-card:hover {
          transform: translateY(-4px);
          filter: brightness(1.06);
        }
        .phw-card__media {
          position: relative;
          aspect-ratio: 1 / 1;
          overflow: hidden;
        }
        .phw-card__media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .phw-card__badge {
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
        .phw-card__body {
          padding: 10px 12px 12px;
          display: grid;
          gap: 10px;
        }
        .phw-card__title {
          font-family: 'Press Start 2P', cursive;
          font-size: 12px;
          letter-spacing: 0.03em;
          color: #ff3aff;
          text-transform: uppercase;
        }
        .phw-card__pill {
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

