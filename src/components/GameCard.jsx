import React from 'react'

export default React.memo(function GameCard({
  title,
  img,
  tokenName,
  tokenImg,
  onClick,
  playCount,
  imgLoading = 'lazy',
  imgFetchPriority
}) {
  return (
    <div className="game-card">
      <div className="game-card__media">
        <img
          src={img}
          alt={title}
          loading={imgLoading}
          decoding="async"
          fetchPriority={imgFetchPriority}
        />
        <div className="badge">{playCount ? `${playCount} Played` : '12k Played'}</div>
      </div>
      <div className="game-card__body">
        <h4>{title}</h4>
        {/* Token Info & Buy/Sell Buttons */}
        <div className="game-card__row">
          <div className="game-card__token-info">
            {tokenImg ? (
              <img src={tokenImg} alt={tokenName} className="token-icon" />
            ) : (
              <div className="token-icon-placeholder" />
            )}
            <div className="token-details">
              <span className="token-name">{tokenName || 'Token Name'}</span>
              <span className="token-price">$0.058</span>
            </div>
          </div>

          <div className="game-card__trade-actions">
            <button className="btn-trade btn-buy" type="button">Buy</button>
            <button className="btn-trade btn-sell" type="button">Sell</button>
          </div>
        </div>

        <button className="btn-play" type="button" onClick={onClick}>
          ▶ PLAY
        </button>
      </div>

      <style jsx>{`
        .game-card {
          /* Inherit styling from global css or define here if not present global */
          /* Assuming existing global styles for .game-card handling basic layout/bg */
        }
        
        .game-card__row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
          gap: 4px; /* Reduced gap */
          flex-wrap: wrap; /* Allow wrapping on small screens */
        }

        .game-card__token-info {
          display: flex;
          align-items: center;
          gap: 6px; /* Reduced gap */
          min-width: 0; /* Allow flex shrinking */
          flex: 1 1 auto;
        }

        .token-icon {
          width: 28px; /* Reduced size */
          height: 28px;
          border-radius: 50%;
          object-fit: cover;
          flex-shrink: 0;
        }

        .token-icon-placeholder {
           width: 28px; /* Reduced size */
           height: 28px;
           border-radius: 50%;
           background: rgba(255, 255, 255, 0.1);
           flex-shrink: 0;
        }

        .token-details {
          display: flex;
          flex-direction: column;
          gap: 0px; /* Tighter leading */
          min-width: 0;
        }
        
        .token-name {
          font-size: 11px; /* Smaller font */
          color: #fff;
          font-weight: 600;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .token-price {
          font-size: 10px; /* Smaller font */
          color: rgba(255, 255, 255, 0.6);
        }

        .game-card__trade-actions {
          display: flex;
          align-items: center;
          flex-shrink: 0; /* Prevent buttons from shrinking too much */
        }

        .btn-trade {
          font-family: 'Inter', system-ui, sans-serif !important;
          background: transparent;
          border: 1px solid;
          padding: 6px 10px; /* Reduced padding */
          font-size: 11px; /* Slightly smaller */
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          line-height: 1;
        }

        .btn-buy {
          color: #22c55e;
          border-color: #22c55e;
          border-radius: 999px 0 0 999px;
          border-right-width: 0.5px;
        }
        .btn-buy:hover {
          background: rgba(34, 197, 94, 0.1);
        }

        .btn-sell {
          color: #ef4444;
          border-color: #ef4444;
          border-radius: 0 999px 999px 0;
          border-left-width: 0.5px;
        }
        .btn-sell:hover {
          background: rgba(239, 68, 68, 0.1);
        }

        /* Responsive adjustments for narrow cards */
        @media (max-width: 768px) {
          .game-card__row {
            gap: 8px;
          }
          
          .game-card__token-info {
            flex: 0 1 100%;
            max-width: 100%;
          }
          
          .game-card__trade-actions {
            flex: 0 1 100%;
            justify-content: center;
            margin-top: 4px;
          }
          
          .token-name {
            font-size: 10px;
          }
          
          .token-price {
            font-size: 9px;
          }
          
          .btn-trade {
            padding: 5px 12px;
            font-size: 10px;
          }
        }
      `}</style>
    </div>
  )
})
