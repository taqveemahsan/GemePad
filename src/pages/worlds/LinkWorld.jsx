import React, { useCallback, useMemo } from 'react'
import { useTonConnectUI, useTonWallet } from '@tonconnect/ui-react'
import { navigate } from '../../navigation'
import Bg01 from '../../assets/herosection/Bg01.png'
import heroBg from '../../assets/hero.png'

// TODO: Replace with real Link hero image when you provide assets
import heroLink from '../../assets/explore/LINK WORLD_Right_Side.png'

import g1 from '../../assets/explore/1.png'
import g2 from '../../assets/explore/2.png'
import g3 from '../../assets/explore/3.png'
import g4 from '../../assets/explore/4.png'
import g5 from '../../assets/explore/5.png'
import g6 from '../../assets/explore/6.png'
import g7 from '../../assets/explore/7.png'
import g8 from '../../assets/explore/8.png'
import g9 from '../../assets/explore/9.png'

const linkGames = [
  { id: 'link-1', title: 'GAME NAME HERE', img: g1 },
  { id: 'link-2', title: 'GAME NAME HERE', img: g2 },
  { id: 'link-3', title: 'GAME NAME HERE', img: g3 },
  { id: 'link-4', title: 'GAME NAME HERE', img: g4 },
  { id: 'link-5', title: 'GAME NAME HERE', img: g5 },
  { id: 'link-6', title: 'GAME NAME HERE', img: g6 },
  { id: 'link-7', title: 'GAME NAME HERE', img: g7 },
  { id: 'link-8', title: 'GAME NAME HERE', img: g8 },
  { id: 'link-9', title: 'GAME NAME HERE', img: g9 },
  { id: 'link-10', title: 'GAME NAME HERE', img: g1 },
  { id: 'link-11', title: 'GAME NAME HERE', img: g2 },
  { id: 'link-12', title: 'GAME NAME HERE', img: g3 },
]

function LinkGameCard({ game, onClick }) {
  return (
    <button type="button" className="lnw-card" onClick={onClick}>
      <div className="lnw-card__media">
        <img src={game.img} alt={game.title} loading="lazy" decoding="async" />
        <div className="lnw-card__badge">12k Players</div>
      </div>
      <div className="lnw-card__body">
        <div className="lnw-card__title">{game.title}</div>
        <div className="lnw-card__pill">▶ PLAY</div>
      </div>
    </button>
  )
}

export default function LinkWorld() {
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
    <div className="page lnw">
      <div className="page__bg-container">
        <img src={Bg01} alt="" className="page__main-bg lnw__bg" loading="lazy" decoding="async" />
      </div>

      <header className="hero lnw-hero">
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

        <div className="lnw-hero__frame" style={{ '--lnw-hero-bg': `url("${heroBg}")` }}>
          <div className="lnw-hero__inner">
            <div className="lnw-hero__left">
              <div className="lnw-hero__title">LINK WORLD</div>
              <div className="lnw-hero__desc">
                Lorem ipsum dolor sit amet consectetur. Pulvinar egestas nec et egestas eu odio amet iaculis auctor. Rutrum sit aliquam id iaculis morbi quis ut enim.
              </div>
              <button className="lnw-hero__cta" type="button">
                CREATE YOU OWN LINK GAME
              </button>
            </div>
            <div className="lnw-hero__right" aria-hidden="true">
              <img className="lnw-hero__main" src={heroLink} alt="" loading="eager" decoding="async" fetchPriority="high" />
            </div>
          </div>
        </div>
      </header>

      <main className="lnw-main">
        <div className="lnw-section">
          <div className="lnw-section__title">
            TOP <span className="lnw-section__accent">LINK GAMES</span>
          </div>
          <div className="lnw-grid">
            {linkGames.map((g) => (
              <LinkGameCard key={g.id} game={g} onClick={() => onGameClick(g)} />
            ))}
          </div>
        </div>

        <footer className="lnw-footer">
          <div className="lnw-footer__inner">
            <div className="lnw-footer__brand">
              <div className="lnw-footer__logo">GEMEPAD.FUN</div>
              <div className="lnw-footer__desc">
                Lorem ipsum dolor sit amet consectetur. Neque dolor non amet ullamcorper nullam nunc in diam.
              </div>
            </div>
            <div className="lnw-footer__cols">
              <div className="lnw-footer__col">
                <div className="lnw-footer__head">Sections</div>
                <a href="#">Home</a>
                <a href="#">How it Works</a>
                <a href="#">Key Features</a>
              </div>
              <div className="lnw-footer__col">
                <div className="lnw-footer__head">Sections</div>
                <a href="#">Platforms</a>
                <a href="#">Subscription</a>
                <a href="#">Testimonials</a>
              </div>
              <div className="lnw-footer__col">
                <div className="lnw-footer__head">Company</div>
                <a href="#">About</a>
                <a href="#">Careers</a>
                <a href="#">Contact</a>
              </div>
            </div>
            <div className="lnw-footer__bottom">
              <div>© 2010-2025 GamePadFun. All rights reserved</div>
              <div className="lnw-footer__bottom-links">
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
                <a href="#">Cookies Settings</a>
              </div>
            </div>
          </div>
        </footer>
      </main>

      <style jsx>{`
        .lnw__bg {
          position: fixed;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.75;
        }

        .lnw-hero {
          padding: 10px 16px 60px;
        }

        .lnw-hero__frame {
          --lnw-blue: #00a3ff;
          --lnw-cut: 60px;
          --lnw-cut-inner: 58px;
          width: 100%;
          margin: 14px auto 0;
          position: relative;
          padding: 2px;
          overflow: hidden;
          background: linear-gradient(
            90deg,
            color-mix(in oklab, var(--lnw-blue), #ffffff 10%),
            color-mix(in oklab, var(--lnw-blue), #8d3cff 16%)
          );
          clip-path: polygon(
            var(--lnw-cut) 0,
            100% 0,
            100% calc(100% - var(--lnw-cut)),
            calc(100% - var(--lnw-cut)) 100%,
            0 100%,
            0 var(--lnw-cut)
          );
        }
        .lnw-hero__frame::before {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--lnw-hero-bg);
          background-size: cover;
          background-position: center;
          opacity: 0.5;
          filter: saturate(1.1);
          clip-path: inherit;
        }
        .lnw-hero__inner {
          position: relative;
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          gap: 24px;
          padding: 32px 34px;
          background: linear-gradient(90deg, rgba(10, 10, 24, 0.86), rgba(10, 10, 24, 0.56));
          clip-path: polygon(
            var(--lnw-cut-inner) 0,
            100% 0,
            100% calc(100% - var(--lnw-cut-inner)),
            calc(100% - var(--lnw-cut-inner)) 100%,
            0 100%,
            0 var(--lnw-cut-inner)
          );
          align-items: center;
        }
        .lnw-hero__left {
          max-width: 560px;
        }
        .lnw-hero__title {
          font-family: 'Press Start 2P', cursive;
          font-size: 44px;
          color: var(--lnw-blue);
          letter-spacing: 0.04em;
          text-shadow: 0 0 14px color-mix(in oklab, var(--lnw-blue), transparent 65%);
        }
        .lnw-hero__desc {
          margin-top: 16px;
          font-size: 13px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.78);
          max-width: 520px;
        }
        .lnw-hero__cta {
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
        .lnw-hero__right {
          display: flex;
          align-items: flex-end;
          justify-content: flex-end;
          min-height: 220px;
        }
        .lnw-hero__main {
          height: 250px;
          width: auto;
          object-fit: contain;
          max-width: min(520px, 100%);
        }

        .lnw-main {
          padding: 0 16px 60px;
        }

        .lnw-section {
          max-width: 1600px;
          margin: 0 auto;
        }
        .lnw-section__title {
          font-family: 'Press Start 2P', cursive;
          font-size: 18px;
          margin: 18px 0 16px;
          letter-spacing: 0.04em;
        }
        .lnw-section__accent {
          color: #ff3aff;
        }

        .lnw-grid {
          display: grid;
          grid-template-columns: repeat(6, minmax(0, 1fr));
          gap: 14px;
        }

        .lnw-card {
          border: 0;
          padding: 0;
          text-align: left;
          cursor: pointer;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 18px;
          overflow: hidden;
          transition: transform 160ms ease, filter 160ms ease;
        }
        .lnw-card:hover {
          transform: translateY(-4px);
          filter: brightness(1.06);
        }
        .lnw-card__media {
          position: relative;
          aspect-ratio: 1 / 1;
          overflow: hidden;
        }
        .lnw-card__media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .lnw-card__badge {
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
        .lnw-card__body {
          padding: 10px 12px 12px;
          display: grid;
          gap: 10px;
        }
        .lnw-card__title {
          font-family: 'Press Start 2P', cursive;
          font-size: 12px;
          letter-spacing: 0.03em;
          color: #ff3aff;
          text-transform: uppercase;
        }
        .lnw-card__pill {
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

        .lnw-footer {
          margin: 48px auto 0;
          max-width: 1600px;
        }
        .lnw-footer__inner {
          background: rgba(12, 12, 26, 0.92);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 22px;
          padding: 26px 26px 18px;
        }
        .lnw-footer__logo {
          font-family: 'Press Start 2P', cursive;
          font-size: 20px;
          margin-bottom: 12px;
        }
        .lnw-footer__desc {
          color: rgba(255, 255, 255, 0.6);
          font-size: 12px;
          line-height: 1.6;
          max-width: 360px;
        }
        .lnw-footer__cols {
          margin-top: 18px;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 24px;
          justify-content: end;
        }
        .lnw-footer__col {
          display: grid;
          gap: 10px;
          justify-items: start;
        }
        .lnw-footer__head {
          font-weight: 800;
          color: rgba(255, 255, 255, 0.92);
        }
        .lnw-footer__col a {
          color: rgba(255, 255, 255, 0.55);
          text-decoration: none;
          font-size: 12px;
        }
        .lnw-footer__col a:hover {
          color: #fff;
        }
        .lnw-footer__bottom {
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
        .lnw-footer__bottom-links {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }
        .lnw-footer__bottom-links a {
          color: rgba(255, 255, 255, 0.5);
          text-decoration: none;
          font-size: 12px;
        }
        .lnw-footer__bottom-links a:hover {
          color: #fff;
        }

        @media (max-width: 1200px) {
          .lnw-hero__inner {
            grid-template-columns: 1fr;
          }
          .lnw-hero__right {
            justify-content: center;
          }
          .lnw-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }
        @media (max-width: 720px) {
          .lnw-hero__title {
            font-size: 30px;
          }
          .lnw-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
          .lnw-footer__cols {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}

