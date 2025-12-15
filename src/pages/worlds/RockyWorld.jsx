import React, { useCallback, useMemo } from 'react'
import { useTonConnectUI, useTonWallet } from '@tonconnect/ui-react'
import { navigate } from '../../navigation'
import Bg01 from '../../assets/herosection/Bg01.png'
import heroBg from '../../assets/hero.png'

// TODO: Replace with real Rocky Rabbit hero image when you provide assets
import heroRocky from '../../assets/rockyworld/1.png'

import g1 from '../../assets/explore/1.png'
import g2 from '../../assets/explore/2.png'
import g3 from '../../assets/explore/3.png'
import g4 from '../../assets/explore/4.png'
import g5 from '../../assets/explore/5.png'
import g6 from '../../assets/explore/6.png'
import g7 from '../../assets/explore/7.png'
import g8 from '../../assets/explore/8.png'
import g9 from '../../assets/explore/9.png'

const rockyGames = [
  { id: 'rocky-1', title: 'GAME NAME HERE', img: g1 },
  { id: 'rocky-2', title: 'GAME NAME HERE', img: g2 },
  { id: 'rocky-3', title: 'GAME NAME HERE', img: g3 },
  { id: 'rocky-4', title: 'GAME NAME HERE', img: g4 },
  { id: 'rocky-5', title: 'GAME NAME HERE', img: g5 },
  { id: 'rocky-6', title: 'GAME NAME HERE', img: g6 },
  { id: 'rocky-7', title: 'GAME NAME HERE', img: g7 },
  { id: 'rocky-8', title: 'GAME NAME HERE', img: g8 },
  { id: 'rocky-9', title: 'GAME NAME HERE', img: g9 },
  { id: 'rocky-10', title: 'GAME NAME HERE', img: g1 },
  { id: 'rocky-11', title: 'GAME NAME HERE', img: g2 },
  { id: 'rocky-12', title: 'GAME NAME HERE', img: g3 },
]

function RockyGameCard({ game, onClick }) {
  return (
    <button type="button" className="rw-card" onClick={onClick}>
      <div className="rw-card__media">
        <img src={game.img} alt={game.title} loading="lazy" decoding="async" />
        <div className="rw-card__badge">12k Players</div>
      </div>
      <div className="rw-card__body">
        <div className="rw-card__title">{game.title}</div>
        <div className="rw-card__pill">▶ PLAY</div>
      </div>
    </button>
  )
}

export default function RockyWorld() {
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
    <div className="page rw">
      <div className="page__bg-container">
        <img src={Bg01} alt="" className="page__main-bg rw__bg" loading="lazy" decoding="async" />
      </div>

      <header className="hero rw-hero">
        <div className="hero__topbar">
          <div className="nav-left">
            <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>GEMEPAD.FUN</div>
            <button className="btn-create" type="button">CREATE GAME</button>
          </div>

          <div className="search">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input type="text" placeholder="Search games here..." />
          </div>

          <div className="nav-right">
            <button className="btn-p2e" type="button">PLAY TO EARN</button>
            <button className="btn-connect" type="button" onClick={() => tonConnectUI.openModal()}>
              {connectLabel}
            </button>
          </div>
        </div>

        <div className="rw-hero__frame" style={{ '--rw-hero-bg': `url("${heroBg}")` }}>
          <div className="rw-hero__inner">
            <div className="rw-hero__left">
              <div className="rw-hero__title">ROCKY RABBIT WORLD</div>
              <div className="rw-hero__desc">
                Lorem ipsum dolor sit amet consectetur. Pulvinar egestas nec et egestas eu odio amet iaculis auctor. Rutrum sit aliquam id iaculis morbi quis ut enim.
              </div>
              <button className="rw-hero__cta" type="button">CREATE YOU OWN ROCKY GAME</button>
            </div>
            <div className="rw-hero__right" aria-hidden="true">
              <img className="rw-hero__main" src={heroRocky} alt="" loading="eager" decoding="async" fetchPriority="high" />
            </div>
          </div>
        </div>
      </header>

      <main className="rw-main">
        <div className="rw-section">
          <div className="rw-section__title">
            TOP <span className="rw-section__accent">ROCKY RABBIT GAMES</span>
          </div>
          <div className="rw-grid">
            {rockyGames.map((g) => (
              <RockyGameCard key={g.id} game={g} onClick={() => onGameClick(g)} />
            ))}
          </div>
        </div>


      </main>

      <style jsx>{`
        .rw__bg {
          position: fixed;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.75;
        }

        .rw-hero {
          padding: 10px 16px 60px;
        }

        .rw-hero__frame {
          --rw-blue: #00d1ff;
          --rw-cut: 60px;
          --rw-cut-inner: 58px;
          width: 100%;
          margin: 14px auto 0;
          position: relative;
          padding: 2px;
          overflow: hidden;
          background: linear-gradient(90deg, color-mix(in oklab, var(--rw-blue), #ffffff 12%), color-mix(in oklab, var(--rw-blue), #8d3cff 18%));
          clip-path: polygon(
            var(--rw-cut) 0,
            100% 0,
            100% calc(100% - var(--rw-cut)),
            calc(100% - var(--rw-cut)) 100%,
            0 100%,
            0 var(--rw-cut)
          );
        }
        .rw-hero__frame::before {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--rw-hero-bg);
          background-size: cover;
          background-position: center;
          opacity: 0.5;
          filter: saturate(1.1);
          clip-path: inherit;
        }
        .rw-hero__inner {
          position: relative;
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          gap: 24px;
          padding: 28px 34px;
          background: linear-gradient(90deg, rgba(10, 10, 24, 0.86), rgba(10, 10, 24, 0.56));
          clip-path: polygon(
            var(--rw-cut-inner) 0,
            100% 0,
            100% calc(100% - var(--rw-cut-inner)),
            calc(100% - var(--rw-cut-inner)) 100%,
            0 100%,
            0 var(--rw-cut-inner)
          );
          align-items: center;
        }
        .rw-hero__left {
        }
        .rw-hero__title {
          font-family: 'Press Start 2P', cursive;
          font-size: 44px;
          color: var(--rw-blue);
          letter-spacing: 0.04em;
          text-shadow: 0 0 14px color-mix(in oklab, var(--rw-blue), transparent 65%);
        }
        .rw-hero__desc {
          margin-top: 16px;
          font-size: 13px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.78);
          max-width: 520px;
        }
        .rw-hero__cta {
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
        .rw-hero__right {
          display: flex;
          align-items: flex-end;
          justify-content: flex-end;
          min-height: 220px;
        }
        .rw-hero__main {
          height: 250px;
          width: auto;
          object-fit: contain;
          max-width: min(520px, 100%);
        }

        .rw-main {
          padding: 0 16px 60px;
        }

        .rw-section {
          max-width: 1600px;
          margin: 0 auto;
        }
        .rw-section__title {
          font-family: 'Press Start 2P', cursive;
          font-size: 18px;
          margin: 18px 0 16px;
          letter-spacing: 0.04em;
        }
        .rw-section__accent {
          color: #c61ae7;
        }

        .rw-grid {
          display: grid;
          grid-template-columns: repeat(6, minmax(0, 1fr));
          gap: 14px;
        }

        .rw-card {
          border: 0;
          padding: 0;
          text-align: left;
          cursor: pointer;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 18px;
          overflow: hidden;
          transition: transform 160ms ease, filter 160ms ease;
        }
        .rw-card:hover {
          transform: translateY(-4px);
          filter: brightness(1.06);
        }
        .rw-card__media {
          position: relative;
          aspect-ratio: 1 / 1;
          overflow: hidden;
        }
        .rw-card__media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .rw-card__badge {
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
        .rw-card__body {
          padding: 10px 12px 12px;
          display: grid;
          gap: 10px;
        }
        .rw-card__title {
          font-family: 'Press Start 2P', cursive;
          font-size: 12px;
          letter-spacing: 0.03em;
          color: #c61ae7;
          text-transform: uppercase;
        }
        .rw-card__pill {
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

