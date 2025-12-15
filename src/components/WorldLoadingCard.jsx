import React from 'react'

export default function WorldLoadingCard({ theme = 'default' }) {
  return (
    <div className={`world-card ${theme}-card`}>
      <div className="world-card__media skeleton-bg"></div>
      <div className="world-card__body">
        <div className="skeleton-text skeleton-bg"></div>
        <div className="skeleton-pill skeleton-bg"></div>
      </div>

      <style jsx>{`
        .world-card {
          border: 0;
          padding: 0;
          text-align: left;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 18px;
          overflow: hidden;
          opacity: 0.6;
          pointer-events: none;
        }
        .world-card__media {
          position: relative;
          aspect-ratio: 1 / 1;
          overflow: hidden;
        }
        .world-card__body {
          padding: 10px 12px 12px;
          display: grid;
          gap: 10px;
        }
        .skeleton-bg {
          background: linear-gradient(90deg, #1a1a2e 25%, #2a2a3e 50%, #1a1a2e 75%);
          background-size: 200% 100%;
          animation: loading 1.5s ease-in-out infinite;
        }
        .skeleton-text {
          height: 14px;
          border-radius: 4px;
          width: 80%;
          margin-bottom: 2px;
        }
        .skeleton-pill {
          height: 34px;
          border-radius: 999px;
          width: 100%;
        }
      `}</style>
    </div>
  )
}
