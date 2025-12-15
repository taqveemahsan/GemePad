import React, { useCallback, useMemo } from 'react'
import { useTonConnectUI, useTonWallet } from '@tonconnect/ui-react'
import { navigate } from '../../navigation'
import Bg01 from '../../assets/herosection/Bg01.png'
import heroBg from '../../assets/hero.png'
import heroPepe from '../../assets/explore/PEPE WORLD_Right_Side.png'
import heroSide from '../../assets/explore/7.png'

import g1 from '../../assets/explore/1.png'
import g2 from '../../assets/explore/2.png'
import g3 from '../../assets/explore/3.png'
import g4 from '../../assets/explore/4.png'
import g5 from '../../assets/explore/5.png'
import g6 from '../../assets/explore/6.png'
import g7 from '../../assets/explore/7.png'
import g8 from '../../assets/explore/8.png'
import g9 from '../../assets/explore/9.png'

const pepeGames = [
  { id: 'pepe-1', title: 'GAME NAME HERE', img: g1 },
  { id: 'pepe-2', title: 'GAME NAME HERE', img: g2 },
  { id: 'pepe-3', title: 'GAME NAME HERE', img: g3 },
  { id: 'pepe-4', title: 'GAME NAME HERE', img: g4 },
  { id: 'pepe-5', title: 'GAME NAME HERE', img: g5 },
  { id: 'pepe-6', title: 'GAME NAME HERE', img: g6 },
  { id: 'pepe-7', title: 'GAME NAME HERE', img: g7 },
  { id: 'pepe-8', title: 'GAME NAME HERE', img: g8 },
  { id: 'pepe-9', title: 'GAME NAME HERE', img: g9 },
]

function PepeGameCard({ game, onClick }) {
  return (
    <button type="button" className="pw-card" onClick={onClick}>
      <div className="pw-card__media">
        <img src={game.img} alt={game.title} loading="lazy" decoding="async" />
        <div className="pw-card__badge">12k Players</div>
      </div>
      <div className="pw-card__body">
        <div className="pw-card__title">{game.title}</div>
        <div className="pw-card__pill">▶ PLAY</div>
      </div>
    </button>
  )
}

export default function PepeWorld() {
  const [tonConnectUI] = useTonConnectUI()
  const wallet = useTonWallet()

  const connectLabel = useMemo(() => {
    const addr = wallet?.account?.address
    return addr ? `${addr.slice(0, 4)}…${addr.slice(-4)}` : 'CONNECT WALLET'
  }, [wallet?.account?.address])

  const onGameClick = useCallback((game) => {
    navigate(`/game?id=${game.id}`, { game: { id: game.id, gameId: game.id, GameName: game.title, GameThumbnail: game.img, GameURL: '#' } })
  }, [])

  return (
    <div className="page pw">
      <div className="page__bg-container">
        <img src={Bg01} alt="" className="page__main-bg pw__bg" loading="lazy" decoding="async" />
      </div>

      <header className="hero pw-hero">
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

        <div className="pw-hero__frame" style={{ '--pw-hero-bg': `url("${heroBg}")` }}>
          <div className="pw-hero__inner">
            <div className="pw-hero__left">
              <div className="pw-hero__title">PEPE WORLD</div>
              <div className="pw-hero__desc">
                Lorem ipsum dolor sit amet consectetur. Pulvinar egestas nec et egestas eu odio amet iaculis auctor. Rutrum sit aliquam id iaculis morbi quis ut enim.
              </div>
              <button className="pw-hero__cta" type="button">CREATE YOU OWN PEPE GAME</button>
            </div>
            <div className="pw-hero__right" aria-hidden="true">
              {/* <img className="pw-hero__side" src={heroSide} alt="" loading="lazy" decoding="async" /> */}
              <img className="pw-hero__main" src={heroPepe} alt="" loading="eager" decoding="async" fetchPriority="high" />
              {/* <img className="pw-hero__side pw-hero__side--r" src={heroSide} alt="" loading="lazy" decoding="async" /> */}
            </div>
          </div>
        </div>
      </header>

      <main className="pw-main">
        <div className="pw-section">
          <div className="pw-section__title">
            TOP <span className="pw-section__accent">PEPE GAMES</span>
          </div>
          <div className="pw-grid">
            {pepeGames.map((g) => (
              <PepeGameCard key={g.id} game={g} onClick={() => onGameClick(g)} />
            ))}
          </div>
        </div>

        <footer className="pw-footer">
          <div className="pw-footer__inner">
            <div className="pw-footer__brand">
              <div className="pw-footer__logo">GEMEPAD.FUN</div>
              <div className="pw-footer__desc">
                Lorem ipsum dolor sit amet consectetur. Neque dolor non amet ullamcorper nullam nunc in diam.
              </div>
            </div>
            <div className="pw-footer__cols">
              <div className="pw-footer__col">
                <div className="pw-footer__head">Sections</div>
                <a href="#">Home</a>
                <a href="#">How it Works</a>
                <a href="#">Key Features</a>
              </div>
              <div className="pw-footer__col">
                <div className="pw-footer__head">Sections</div>
                <a href="#">Platforms</a>
                <a href="#">Subscription</a>
                <a href="#">Testimonials</a>
              </div>
              <div className="pw-footer__col">
                <div className="pw-footer__head">Company</div>
                <a href="#">About</a>
                <a href="#">Careers</a>
                <a href="#">Contact</a>
              </div>
            </div>
            <div className="pw-footer__bottom">
              <div>© 2010-2025 GamePadFun. All rights reserved</div>
              <div className="pw-footer__bottom-links">
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
                <a href="#">Cookies Settings</a>
              </div>
            </div>
          </div>
        </footer>
      </main>

      <style jsx>{`
        .pw__bg {
          position: fixed;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.75;
        }

        .pw-hero {
          padding: 10px 16px 60px;
        }

        .pw-hero__frame {
          --pw-green: #46fb5c;
          --pw-cut: 60px;
          --pw-cut-inner: 58px;
          width: 100%;
          margin: 14px auto 0;
          position: relative;
          padding: 2px;
          overflow: hidden;
          background: linear-gradient(90deg, color-mix(in oklab, var(--pw-green), #ffffff 8%), color-mix(in oklab, var(--pw-green), #00ff66 20%));
          clip-path: polygon(
            var(--pw-cut) 0,
            100% 0,
            100% calc(100% - var(--pw-cut)),
            calc(100% - var(--pw-cut)) 100%,
            0 100%,
            0 var(--pw-cut)
          );
        }
        .pw-hero__frame::before {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--pw-hero-bg);
          background-size: cover;
          background-position: center;
          opacity: 0.5;
          filter: saturate(1.1);
          clip-path: inherit;
        }
        .pw-hero__inner {
          position: relative;
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          gap: 24px;
          padding: 32px 34px;
          background: linear-gradient(90deg, rgba(10, 10, 24, 0.86), rgba(10, 10, 24, 0.56));
          clip-path: polygon(
            var(--pw-cut-inner) 0,
            100% 0,
            100% calc(100% - var(--pw-cut-inner)),
            calc(100% - var(--pw-cut-inner)) 100%,
            0 100%,
            0 var(--pw-cut-inner)
          );
        }
        .pw-hero__left {
          max-width: 560px;
        }
        .pw-hero__title {
          font-family: 'Press Start 2P', cursive;
          font-size: 44px;
          color: var(--pw-green);
          letter-spacing: 0.04em;
          text-shadow: 0 0 14px color-mix(in oklab, var(--pw-green), transparent 65%);
        }
        .pw-hero__desc {
          margin-top: 16px;
          font-size: 13px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.78);
          max-width: 520px;
        }
        .pw-hero__cta {
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
        .pw-hero__right {
          position: relative;
          min-height: 220px;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          gap: 18px;
        }
        .pw-hero__main {
          height: 240px;
          width: auto;
          object-fit: contain;
        }
        .pw-hero__side {
          height: 210px;
          width: auto;
          opacity: 0.9;
          object-fit: contain;
        }
        .pw-hero__side--r {
          transform: scaleX(-1);
        }

        .pw-main {
          padding: 0 16px 60px;
        }

        .pw-section {
          max-width: 1600px;
          margin: 0 auto;
        }
        .pw-section__title {
          font-family: 'Press Start 2P', cursive;
          font-size: 18px;
          margin: 18px 0 16px;
          letter-spacing: 0.04em;
        }
        .pw-section__accent {
          color: #c61ae7;
        }

        .pw-grid {
          display: grid;
          grid-template-columns: repeat(6, minmax(0, 1fr));
          gap: 14px;
        }

        .pw-card {
          border: 0;
          padding: 0;
          text-align: left;
          cursor: pointer;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 18px;
          overflow: hidden;
          transition: transform 160ms ease, filter 160ms ease;
        }
        .pw-card:hover {
          transform: translateY(-4px);
          filter: brightness(1.06);
        }
        .pw-card__media {
          position: relative;
          aspect-ratio: 1 / 1;
          overflow: hidden;
        }
        .pw-card__media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .pw-card__badge {
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
        .pw-card__body {
          padding: 10px 12px 12px;
          display: grid;
          gap: 10px;
        }
        .pw-card__title {
          font-family: 'Press Start 2P', cursive;
          font-size: 12px;
          letter-spacing: 0.03em;
          color: #c61ae7;
          text-transform: uppercase;
        }
        .pw-card__pill {
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

        .pw-footer {
          margin: 48px auto 0;
          max-width: 1600px;
        }
        .pw-footer__inner {
          background: rgba(12, 12, 26, 0.92);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 22px;
          padding: 26px 26px 18px;
        }
        .pw-footer__logo {
          font-family: 'Press Start 2P', cursive;
          font-size: 20px;
          margin-bottom: 12px;
        }
        .pw-footer__desc {
          color: rgba(255, 255, 255, 0.6);
          font-size: 12px;
          line-height: 1.6;
          max-width: 360px;
        }
        .pw-footer__cols {
          margin-top: 18px;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 24px;
          justify-content: end;
        }
        .pw-footer__col {
          display: grid;
          gap: 10px;
          justify-items: start;
        }
        .pw-footer__head {
          font-weight: 800;
          color: rgba(255, 255, 255, 0.92);
        }
        .pw-footer__col a {
          color: rgba(255, 255, 255, 0.55);
          text-decoration: none;
          font-size: 12px;
        }
        .pw-footer__col a:hover {
          color: #fff;
        }
        .pw-footer__bottom {
          margin-top: 18px;
          padding-top: 14px;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          color: rgba(255, 255, 255, 0.5);
          font-size: 12px;
          flex-wrap: wrap;
        }
        .pw-footer__bottom-links {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }
        .pw-footer__bottom-links a {
          color: rgba(255, 255, 255, 0.5);
          text-decoration: none;
          font-size: 12px;
        }
        .pw-footer__bottom-links a:hover {
          color: #fff;
        }

        @media (max-width: 1200px) {
          .pw-hero__inner {
            grid-template-columns: 1fr;
          }
          .pw-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }
        @media (max-width: 720px) {
          .pw-hero__title {
            font-size: 32px;
          }
          .pw-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
          .pw-footer__cols {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}
