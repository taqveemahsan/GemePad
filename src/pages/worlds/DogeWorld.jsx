import React, { useCallback, useMemo } from 'react'
import { useTonConnectUI, useTonWallet } from '@tonconnect/ui-react'
import { navigate } from '../../navigation'
import Bg01 from '../../assets/herosection/Bg01.png'
import heroBg from '../../assets/hero.png'
import heroDoge from '../../assets/doge.png'

import d1 from '../../assets/dogegames/Frame 64-card1.png'
import d2 from '../../assets/dogegames/Frame 64-card2.png'
import d3 from '../../assets/dogegames/Frame 64-card3.png'
import d4 from '../../assets/dogegames/Frame 64-card4.png'

import g1 from '../../assets/explore/1.png'
import g2 from '../../assets/explore/2.png'
import g3 from '../../assets/explore/3.png'
import g4 from '../../assets/explore/4.png'
import g5 from '../../assets/explore/5.png'
import g6 from '../../assets/explore/6.png'
import g7 from '../../assets/explore/7.png'
import g8 from '../../assets/explore/8.png'

const dogeGames = [
  { id: 'doge-1', title: 'GAME NAME HERE', img: d1 },
  { id: 'doge-2', title: 'GAME NAME HERE', img: d2 },
  { id: 'doge-3', title: 'GAME NAME HERE', img: d3 },
  { id: 'doge-4', title: 'GAME NAME HERE', img: d4 },
  { id: 'doge-5', title: 'GAME NAME HERE', img: g1 },
  { id: 'doge-6', title: 'GAME NAME HERE', img: g2 },
  { id: 'doge-7', title: 'GAME NAME HERE', img: g3 },
  { id: 'doge-8', title: 'GAME NAME HERE', img: g4 },
  { id: 'doge-9', title: 'GAME NAME HERE', img: g5 },
  { id: 'doge-10', title: 'GAME NAME HERE', img: g6 },
  { id: 'doge-11', title: 'GAME NAME HERE', img: g7 },
  { id: 'doge-12', title: 'GAME NAME HERE', img: g8 },
]

function DogeGameCard({ game, onClick }) {
  return (
    <button type="button" className="dw-card" onClick={onClick}>
      <div className="dw-card__media">
        <img src={game.img} alt={game.title} loading="lazy" decoding="async" />
        <div className="dw-card__badge">12k Players</div>
      </div>
      <div className="dw-card__body">
        <div className="dw-card__title">{game.title}</div>
        <div className="dw-card__pill">▶ PLAY</div>
      </div>
    </button>
  )
}

export default function DogeWorld() {
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
    <div className="page dw">
      <div className="page__bg-container">
        <img src={Bg01} alt="" className="page__main-bg dw__bg" loading="lazy" decoding="async" />
      </div>

      <header className="hero dw-hero">
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

        <div className="dw-hero__frame" style={{ '--dw-hero-bg': `url("${heroBg}")` }}>
          <div className="dw-hero__inner">
            <div className="dw-hero__left">
              <div className="dw-hero__title">DOGE WORLD</div>
              <div className="dw-hero__desc">
                Lorem ipsum dolor sit amet consectetur. Pulvinar egestas nec et egestas eu odio amet iaculis auctor. Rutrum sit aliquam id iaculis morbi quis ut enim.
              </div>
              <button className="dw-hero__cta" type="button">CREATE YOU OWN DOGE GAME</button>
            </div>
            <div className="dw-hero__right" aria-hidden="true">
              <img className="dw-hero__side" src={heroDoge} alt="" loading="lazy" decoding="async" />
              <img className="dw-hero__main" src={heroDoge} alt="" loading="eager" decoding="async" fetchPriority="high" />
              <img className="dw-hero__side dw-hero__side--r" src={heroDoge} alt="" loading="lazy" decoding="async" />
            </div>
          </div>
        </div>
      </header>

      <main className="dw-main">
        <div className="dw-section">
          <div className="dw-section__title">
            TOP <span className="dw-section__accent">DOGE GAMES</span>
          </div>
          <div className="dw-grid">
            {dogeGames.map((g) => (
              <DogeGameCard key={g.id} game={g} onClick={() => onGameClick(g)} />
            ))}
          </div>
        </div>

        <footer className="dw-footer">
          <div className="dw-footer__inner">
            <div className="dw-footer__brand">
              <div className="dw-footer__logo">GEMEPAD.FUN</div>
              <div className="dw-footer__desc">
                Lorem ipsum dolor sit amet consectetur. Neque dolor non amet ullamcorper nullam nunc in diam.
              </div>
            </div>
            <div className="dw-footer__cols">
              <div className="dw-footer__col">
                <div className="dw-footer__head">Sections</div>
                <a href="#">Home</a>
                <a href="#">How it Works</a>
                <a href="#">Key Features</a>
              </div>
              <div className="dw-footer__col">
                <div className="dw-footer__head">Sections</div>
                <a href="#">Platforms</a>
                <a href="#">Subscription</a>
                <a href="#">Testimonials</a>
              </div>
              <div className="dw-footer__col">
                <div className="dw-footer__head">Company</div>
                <a href="#">About</a>
                <a href="#">Careers</a>
                <a href="#">Contact</a>
              </div>
            </div>
            <div className="dw-footer__bottom">
              <div>© 2010-2025 GamePadFun. All rights reserved</div>
              <div className="dw-footer__bottom-links">
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
                <a href="#">Cookies Settings</a>
              </div>
            </div>
          </div>
        </footer>
      </main>

      <style jsx>{`
        .dw__bg {
          position: fixed;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.75;
        }

        .dw-hero {
          padding: 10px 16px 60px;
        }

        .dw-hero__frame {
          --dw-gold: #ffbf00;
          --dw-cut: 60px;
          --dw-cut-inner: 58px;
          width: 100%;
          margin: 14px auto 0;
          position: relative;
          padding: 2px;
          overflow: hidden;
          background: linear-gradient(90deg, color-mix(in oklab, var(--dw-gold), #ffffff 12%), color-mix(in oklab, var(--dw-gold), #ff7a00 30%));
          clip-path: polygon(
            var(--dw-cut) 0,
            100% 0,
            100% calc(100% - var(--dw-cut)),
            calc(100% - var(--dw-cut)) 100%,
            0 100%,
            0 var(--dw-cut)
          );
        }
        .dw-hero__frame::before {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--dw-hero-bg);
          background-size: cover;
          background-position: center;
          opacity: 0.5;
          filter: saturate(1.1);
          clip-path: inherit;
        }
        .dw-hero__inner {
          position: relative;
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          gap: 24px;
          padding: 32px 34px;
          background: linear-gradient(90deg, rgba(10, 10, 24, 0.86), rgba(10, 10, 24, 0.56));
          clip-path: polygon(
            var(--dw-cut-inner) 0,
            100% 0,
            100% calc(100% - var(--dw-cut-inner)),
            calc(100% - var(--dw-cut-inner)) 100%,
            0 100%,
            0 var(--dw-cut-inner)
          );
        }
        .dw-hero__left {
          max-width: 560px;
        }
        .dw-hero__title {
          font-family: 'Press Start 2P', cursive;
          font-size: 44px;
          color: var(--dw-gold);
          letter-spacing: 0.04em;
          text-shadow: 0 0 14px color-mix(in oklab, var(--dw-gold), transparent 65%);
        }
        .dw-hero__desc {
          margin-top: 16px;
          font-size: 13px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.78);
          max-width: 520px;
        }
        .dw-hero__cta {
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
        .dw-hero__right {
          position: relative;
          min-height: 220px;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          gap: 18px;
        }
        .dw-hero__main {
          height: 240px;
          width: auto;
          object-fit: contain;
        }
        .dw-hero__side {
          height: 210px;
          width: auto;
          opacity: 0.9;
          object-fit: contain;
        }
        .dw-hero__side--r {
          transform: scaleX(-1);
        }

        .dw-main {
          padding: 0 16px 60px;
        }

        .dw-section {
          max-width: 1600px;
          margin: 0 auto;
        }
        .dw-section__title {
          font-family: 'Press Start 2P', cursive;
          font-size: 18px;
          margin: 18px 0 16px;
          letter-spacing: 0.04em;
        }
        .dw-section__accent {
          color: #c61ae7;
        }

        .dw-grid {
          display: grid;
          grid-template-columns: repeat(6, minmax(0, 1fr));
          gap: 14px;
        }

        .dw-card {
          border: 0;
          padding: 0;
          text-align: left;
          cursor: pointer;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 18px;
          overflow: hidden;
          transition: transform 160ms ease, filter 160ms ease;
        }
        .dw-card:hover {
          transform: translateY(-4px);
          filter: brightness(1.06);
        }
        .dw-card__media {
          position: relative;
          aspect-ratio: 1 / 1;
          overflow: hidden;
        }
        .dw-card__media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .dw-card__badge {
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
        .dw-card__body {
          padding: 10px 12px 12px;
          display: grid;
          gap: 10px;
        }
        .dw-card__title {
          font-family: 'Press Start 2P', cursive;
          font-size: 12px;
          letter-spacing: 0.03em;
          color: #c61ae7;
          text-transform: uppercase;
        }
        .dw-card__pill {
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

        .dw-footer {
          margin: 48px auto 0;
          max-width: 1600px;
        }
        .dw-footer__inner {
          background: rgba(12, 12, 26, 0.92);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 22px;
          padding: 26px 26px 18px;
        }
        .dw-footer__logo {
          font-family: 'Press Start 2P', cursive;
          font-size: 20px;
          margin-bottom: 12px;
        }
        .dw-footer__desc {
          color: rgba(255, 255, 255, 0.6);
          font-size: 12px;
          line-height: 1.6;
          max-width: 360px;
        }
        .dw-footer__cols {
          margin-top: 18px;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 24px;
          justify-content: end;
        }
        .dw-footer__col {
          display: grid;
          gap: 10px;
          justify-items: start;
        }
        .dw-footer__head {
          font-weight: 800;
          color: rgba(255, 255, 255, 0.92);
        }
        .dw-footer__col a {
          color: rgba(255, 255, 255, 0.55);
          text-decoration: none;
          font-size: 12px;
        }
        .dw-footer__col a:hover {
          color: #fff;
        }
        .dw-footer__bottom {
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
        .dw-footer__bottom-links {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }
        .dw-footer__bottom-links a {
          color: rgba(255, 255, 255, 0.5);
          text-decoration: none;
          font-size: 12px;
        }
        .dw-footer__bottom-links a:hover {
          color: #fff;
        }

        @media (max-width: 1200px) {
          .dw-hero__inner {
            grid-template-columns: 1fr;
          }
          .dw-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }
        @media (max-width: 720px) {
          .dw-hero__title {
            font-size: 32px;
          }
          .dw-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
          .dw-footer__cols {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}

