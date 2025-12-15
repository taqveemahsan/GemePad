import React, { useCallback } from 'react'
import { navigate } from '../navigation'
import Header from './Header'
import WorldGameCard from './WorldGameCard'
import WorldLoadingCard from './WorldLoadingCard'
import Bg01 from '../assets/herosection/Bg01.png'
import heroBg from '../assets/hero.png'

export default function WorldLayout({
  worldId,
  worldTitle,
  worldDescription,
  worldCtaText,
  heroImage,
  games = [],
  loading = false,
  theme = 'default',
  accentColor = '#c61ae7',
}) {
  const onGameClick = useCallback(
    (game) => {
      navigate(`/game?id=${game.id}`, {
        game: {
          id: game.id,
          gameId: game.id,
          GameName: game.title,
          GameThumbnail: game.img,
          GameURL: '#',
        },
      })
    },
    []
  )

  return (
    <div className={`page ${theme}-world`}>
      <div className="page__bg-container">
        <img src={Bg01} alt="" className="page__main-bg world__bg" loading="lazy" decoding="async" />
      </div>

      <header className="hero world-hero">
        <Header />

        <div className="world-hero__frame" style={{ '--world-hero-bg': `url("${heroBg}")` }}>
          <div className="world-hero__inner">
            <div className="world-hero__left">
              <div className="world-hero__title">{worldTitle}</div>
              <div className="world-hero__desc">{worldDescription}</div>
              <button className="world-hero__cta" type="button">
                {worldCtaText}
              </button>
            </div>
            <div className="world-hero__right" aria-hidden="true">
              <img
                className="world-hero__main"
                src={heroImage}
                alt=""
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
            </div>
          </div>
        </div>
      </header>

      <main className="world-main">
        <div className="world-section">
          <div className="world-section__title">
            TOP <span className="world-section__accent">{worldTitle}</span>
          </div>
          <div className="world-grid">
            {loading ? (
              Array.from({ length: 12 }).map((_, idx) => (
                <WorldLoadingCard key={idx} theme={theme} />
              ))
            ) : (
              games.map((game) => (
                <WorldGameCard
                  key={game.id}
                  game={game}
                  onClick={() => onGameClick(game)}
                  theme={theme}
                />
              ))
            )}
          </div>
        </div>
      </main>

      <style jsx>{`
        .world__bg {
          position: fixed;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.75;
        }

        .world-hero {
          padding: 10px 16px 60px;
        }

        .world-hero__frame {
          --world-accent: ${accentColor};
          --world-cut: 60px;
          --world-cut-inner: 58px;
          width: 100%;
          margin: 14px auto 0;
          position: relative;
          padding: 2px;
          overflow: hidden;
          background: linear-gradient(
            90deg,
            color-mix(in oklab, var(--world-accent), #ffffff 12%),
            color-mix(in oklab, var(--world-accent), #8d3cff 18%)
          );
          clip-path: polygon(
            var(--world-cut) 0,
            100% 0,
            100% calc(100% - var(--world-cut)),
            calc(100% - var(--world-cut)) 100%,
            0 100%,
            0 var(--world-cut)
          );
        }
        .world-hero__frame::before {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--world-hero-bg);
          background-size: cover;
          background-position: center;
          opacity: 0.5;
          filter: saturate(1.1);
          clip-path: inherit;
        }
        .world-hero__inner {
          position: relative;
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          gap: 24px;
          padding: 28px 34px;
          background: linear-gradient(90deg, rgba(10, 10, 24, 0.86), rgba(10, 10, 24, 0.56));
          clip-path: polygon(
            var(--world-cut-inner) 0,
            100% 0,
            100% calc(100% - var(--world-cut-inner)),
            calc(100% - var(--world-cut-inner)) 100%,
            0 100%,
            0 var(--world-cut-inner)
          );
          align-items: center;
        }
        .world-hero__title {
          font-family: 'Press Start 2P', cursive;
          font-size: 44px;
          color: var(--world-accent);
          letter-spacing: 0.04em;
          text-shadow: 0 0 14px color-mix(in oklab, var(--world-accent), transparent 65%);
        }
        .world-hero__desc {
          margin-top: 16px;
          font-size: 13px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.78);
          max-width: 520px;
        }
        .world-hero__cta {
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
        .world-hero__right {
          display: flex;
          align-items: flex-end;
          justify-content: flex-end;
          min-height: 220px;
        }
        .world-hero__main {
          height: 250px;
          width: auto;
          object-fit: contain;
          max-width: min(520px, 100%);
        }

        .world-main {
          padding: 0 16px 60px;
        }

        .world-section {
          max-width: 1600px;
          margin: 0 auto;
        }
        .world-section__title {
          font-family: 'Press Start 2P', cursive;
          font-size: 18px;
          margin: 18px 0 16px;
          letter-spacing: 0.04em;
        }
        .world-section__accent {
          color: ${accentColor};
        }

        .world-grid {
          display: grid;
          grid-template-columns: repeat(6, minmax(0, 1fr));
          gap: 14px;
        }

        @media (max-width: 1200px) {
          .world-hero__inner {
            grid-template-columns: 1fr;
          }
          .world-hero__right {
            justify-content: center;
          }
          .world-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }
        @media (max-width: 720px) {
          .world-hero__title {
            font-size: 30px;
          }
          .world-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
      `}</style>
    </div>
  )
}
