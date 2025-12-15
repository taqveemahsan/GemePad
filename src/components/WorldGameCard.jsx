import React from 'react'

export default function WorldGameCard({
  game,
  onClick,
  theme = 'default',
  actionLabel = '▶ PLAY',
  disabled = false,
}) {
  return (
    <button
      type="button"
      className={`world-card ${theme}-card`}
      onClick={onClick}
      disabled={disabled}
      style={{ cursor: disabled ? 'default' : 'pointer', opacity: disabled ? 0.8 : 1 }}
    >
      <div className="world-card__media">
        <img src={game.img} alt={game.title} loading="lazy" decoding="async" />
        <div className="world-card__badge">12k Played</div>
      </div>
      <div className="world-card__body">
        <div className="world-card__title">{game.title}</div>
        <div
          className="world-card__pill"
          style={{
            background: disabled ? '#444' : undefined,
            color: disabled ? '#aaa' : undefined,
          }}
        >
          {actionLabel}
        </div>
      </div>

      <style jsx>{`
        .world-card {
          border: 0;
          padding: 0;
          text-align: left;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 18px;
          overflow: hidden;
          transition: transform 160ms ease, filter 160ms ease;
        }
        .world-card:not(:disabled):hover {
          transform: translateY(-4px);
          filter: brightness(1.06);
        }
        .world-card__media {
          position: relative;
          aspect-ratio: 1 / 1;
          overflow: hidden;
        }
        .world-card__media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .world-card__badge {
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
        .world-card__body {
          padding: 10px 12px 12px;
          display: grid;
          gap: 10px;
        }
        .world-card__title {
          font-family: 'Press Start 2P', cursive;
          font-size: 12px;
          letter-spacing: 0.03em;
          color: #c61ae7;
          text-transform: uppercase;
        }
        .world-card__pill {
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
    </button>
  )
}
