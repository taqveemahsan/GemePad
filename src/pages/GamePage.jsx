import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";
import { navigate, getNavigationState } from "../navigation";
import { useGameById, useGames } from "../hooks/useGames";
import TradeInterface from "../components/TradeInterface";
import heroBg from "../assets/herosection/Mask group (3).png";
import Bg01 from "../assets/herosection/Bg01.png";
import top1 from "../assets/toplaunches/Frame 48.png";

import top6 from '../assets/toplaunches/Frame 55.png'
import GameCard from '../components/GameCard'

const isDev = import.meta?.env?.DEV;

function LoadingCard() {
  return (
    <div className="game-card" style={{ opacity: 0.6 }}>
      <div
        className="game-card__media"
        style={{
          background:
            "linear-gradient(90deg, #1a1a2e 25%, #2a2a3e 50%, #1a1a2e 75%)",
          backgroundSize: "200% 100%",
          animation: "loading 1.5s ease-in-out infinite",
        }}
      >
        <div style={{ paddingTop: "100%" }} />
      </div>
      <div className="game-card__body">
        <div
          style={{
            height: "20px",
            background:
              "linear-gradient(90deg, #1a1a2e 25%, #2a2a3e 50%, #1a1a2e 75%)",
            backgroundSize: "200% 100%",
            animation: "loading 1.5s ease-in-out infinite",
            borderRadius: "4px",
            marginBottom: "10px",
          }}
        />
        <div
          style={{
            height: "36px",
            background:
              "linear-gradient(90deg, #1a1a2e 25%, #2a2a3e 50%, #1a1a2e 75%)",
            backgroundSize: "200% 100%",
            animation: "loading 1.5s ease-in-out infinite",
            borderRadius: "4px",
          }}
        />
      </div>
    </div>
  );
}

function StatRow({ label, value, link }) {
  return (
    <div className="gd-stat">
      <span className="gd-stat__label">{label}</span>
      {link ? (
        <a
          className="gd-stat__value gd-link"
          href="#"
          onClick={(e) => e.preventDefault()}
        >
          {value}
        </a>
      ) : (
        <span className="gd-stat__value">{value}</span>
      )}
    </div>
  );
}

export default function GamePage() {
  const [tonConnectUI] = useTonConnectUI();
  const address = useTonAddress();
  const [gameFromNav, setGameFromNav] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const mediaRef = useRef(null);

  // Get game ID from URL query params
  const urlParams = new URLSearchParams(window.location.search);
  const gameIdFromUrl = urlParams.get("id");

  // Fetch specific game details
  const { game: gameFromApi, loading: apiLoading } = useGameById(gameIdFromUrl);

  // Fetch top launches (dynamic)
  const { games: relatedGames, loading: relatedLoading } = useGames({
    category: "play-to-earn",
    sortBy: "desc",
    page: 1,
    limit: 6,
  });

  // Use navigation state as fallback
  useEffect(() => {
    const navState = getNavigationState();
    if (navState && navState.game) {
      setGameFromNav(navState.game);
    }
  }, []);

  const game = gameFromApi || gameFromNav;
  const loading = apiLoading && !gameFromNav;

  const connectLabel = address
    ? `${address.slice(0, 4)}…${address.slice(-4)}`
    : "CONNECT WALLET";

  const token = game?.tokens?.[0] || {};
  const gameName = game?.GameName || "Night Hunter";
  const gameImage = game?.GameThumbnail || top1;
  const gameURL = game?.GameURL || "#";
  const playCount = game?.playCount || 0;
  const tokenSymbol = token.symbol || "N/A";
  const tokenName = token.name || "N/A";
  const tokenImage = token.imageUrl || token.image || null;

  const embeddedUrl = useMemo(() => {
    if (!gameURL || gameURL === "#") return null;
    try {
      const u = new URL(gameURL, window.location.origin);
      if (u.protocol !== "http:" && u.protocol !== "https:") return null;
      return u.toString();
    } catch {
      return null;
    }
  }, [gameURL]);

  useEffect(() => {
    const sync = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", sync);
    sync();
    return () => document.removeEventListener("fullscreenchange", sync);
  }, []);

  const toggleFullscreen = async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
        return;
      }
      if (mediaRef.current?.requestFullscreen) {
        await mediaRef.current.requestFullscreen();
      }
    } catch {
      // ignore
    }
  };

  const handleGameClick = (g) => {
    navigate(`/game?id=${g.id || g.gameId}`, { game: g });
    window.scrollTo(0, 0);
    // Force reload/re-render logic if needed, but navigate should handle URL change
    // Using simple navigate might not trigger component remount if handled by router in a specific way,
    // but here we are using a custom router.
    // We might need to manually reset state if the route doesn't unmount this component.
    // However, since we read ID from URL in render, it should update on re-render.
    // To ensure full cycle:
    window.location.href = `/game?id=${g.id || g.gameId}`;
  };

  return (
    <div className="page gd">
      <div className="page__bg-container">
        <img src={Bg01} alt="" className="page__main-bg" />
      </div>

      <header className="hero gd-hero">
        <div className="hero__topbar">
          <div className="nav-left">
            <button
              className="logo gd-logo-btn"
              type="button"
              onClick={() => navigate("/")}
            >
              GEMEPAD.FUN
            </button>
            <button className="btn-create" type="button">
              CREATE GAME
            </button>
          </div>

          <div className="search">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input type="text" placeholder="Search games here..." />
          </div>

          <div className="nav-right">
            <button className="btn-p2e" type="button">
              PLAY TO EARN
            </button>
            <button
              className="btn-connect"
              type="button"
              onClick={() => tonConnectUI.openModal()}
            >
              {connectLabel}
            </button>
          </div>
        </div>
      </header>

      <main className="gd-main">
        <div className="gd-grid">
          <section
            className="gd-left"
            style={{ "--gd-hero-bg": `url("${heroBg}")` }}
          >
            <div className="gd-frame">
              <div className="gd-media" ref={mediaRef}>
                {loading ? (
                  <div
                    style={{
                      width: "100%",
                      paddingTop: "100%",
                      background:
                        "linear-gradient(90deg, #1a1a2e 25%, #2a2a3e 50%, #1a1a2e 75%)",
                      backgroundSize: "200% 100%",
                      animation: "loading 1.5s ease-in-out infinite",
                    }}
                  />
                ) : isPlaying && embeddedUrl ? (
                  <iframe
                    className="gd-iframe"
                    src={embeddedUrl}
                    title={gameName}
                    loading="lazy"
                    allow="fullscreen; autoplay; clipboard-read; clipboard-write; gamepad"
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-pointer-lock allow-downloads"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <img
                    src={gameImage}
                    alt="Game cover"
                    className="gd-media__img"
                  />
                )}
              </div>
              {isPlaying && (
                <div className="gd-top-controls">
                  <button
                    className="gd-control-btn"
                    type="button"
                    onClick={toggleFullscreen}
                  >
                    {isFullscreen ? "EXIT FULL" : "FULL SCREEN"}
                  </button>
                  <button
                    className="gd-control-btn"
                    type="button"
                    onClick={async () => {
                      if (document.fullscreenElement) {
                        try {
                          await document.exitFullscreen();
                        } catch {
                          // ignore
                        }
                      }
                      setIsPlaying(false);
                    }}
                  >
                    EXIT
                  </button>
                </div>
              )}
              {!isPlaying && (
                <button
                  className="gd-play"
                  type="button"
                  onClick={() => {
                    if (loading) return;
                    if (!embeddedUrl) return;
                    setIsPlaying(true);
                  }}
                  disabled={loading || !embeddedUrl}
                  style={{ opacity: loading || !embeddedUrl ? 0.5 : 1 }}
                >
                  {loading ? "LOADING..." : "PLAY GAME"}
                </button>
              )}
            </div>
          </section>

          <aside className="gd-right">
            <div className="gd-panel">
              <div className="gd-panel__header">
                {loading ? (
                  <div
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "50%",
                      background:
                        "linear-gradient(90deg, #1a1a2e 25%, #2a2a3e 50%, #1a1a2e 75%)",
                      backgroundSize: "200% 100%",
                      animation: "loading 1.5s ease-in-out infinite",
                    }}
                  />
                ) : tokenImage ? (
                  <img
                    src={tokenImage}
                    alt={tokenSymbol}
                    className="gd-avatar"
                  />
                ) : (
                  <div className="gd-avatar" aria-hidden="true" />
                )}
                <div className="gd-title">
                  {loading ? (
                    <>
                      <div
                        style={{
                          height: "24px",
                          width: "200px",
                          background:
                            "linear-gradient(90deg, #1a1a2e 25%, #2a2a3e 50%, #1a1a2e 75%)",
                          backgroundSize: "200% 100%",
                          animation: "loading 1.5s ease-in-out infinite",
                          borderRadius: "4px",
                          marginBottom: "8px",
                        }}
                      />
                      <div
                        style={{
                          height: "16px",
                          width: "150px",
                          background:
                            "linear-gradient(90deg, #1a1a2e 25%, #2a2a3e 50%, #1a1a2e 75%)",
                          backgroundSize: "200% 100%",
                          animation: "loading 1.5s ease-in-out infinite",
                          borderRadius: "4px",
                        }}
                      />
                    </>
                  ) : (
                    <>
                      <div className="gd-title__name">{gameName}</div>
                      <div className="gd-title__sub">
                        Token: {tokenSymbol} | {playCount} Played
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="gd-panel__scroll">
                {game?.GameDescription && (
                  <div className="gd-description">{game.GameDescription}</div>
                )}

                <div className="gd-progress">
                  <div className="gd-progress__top">
                    <span>Bonding curve progress: 75.1%</span>
                  </div>
                  <div className="gd-bar">
                    <div className="gd-bar__fill" style={{ width: "75%" }} />
                  </div>

                  <div className="gd-pillgrid">
                    <div className="gd-pill">
                      <div className="gd-pill__k">Hitting LP at</div>
                      <div className="gd-pill__v">$23,031.20</div>
                    </div>
                    <div className="gd-pill">
                      <div className="gd-pill__k">On fire at</div>
                      <div className="gd-pill__v">$41,921.39</div>
                    </div>
                    <div className="gd-pill">
                      <div className="gd-pill__k">Graduates at</div>
                      <div className="gd-pill__v">$60,815.66</div>
                    </div>
                  </div>
                </div>

                <div className="gd-stats">
                  <StatRow label="Token Symbol:" value={tokenSymbol} />
                  <StatRow label="Token Name:" value={tokenName} />
                  {token.mintPublicKey && (
                    <StatRow
                      label="Contract address:"
                      value={`${token.mintPublicKey.slice(
                        0,
                        6
                      )}...${token.mintPublicKey.slice(-6)}`}
                      link
                    />
                  )}
                  {token.chain && (
                    <StatRow label="Chain:" value={token.chain.toUpperCase()} />
                  )}
                  <StatRow
                    label="Play Count:"
                    value={playCount.toLocaleString()}
                  />
                  {game?.p2eEligibility?.eligible && (
                    <StatRow label="P2E Eligible:" value="Yes" />
                  )}
                </div>

                <TradeInterface token={token} game={game} />
              </div>
            </div>
          </aside>
        </div>

        <section className="panel">
          <div className="section-header">
            <div>
              <p
                className="eyebrow"
                style={{
                  color: "#c61ae7",
                  fontFamily: "'Press Start 2P', cursive",
                  fontSize: "12px",
                  marginBottom: "8px",
                }}
              >
                TOP LAUNCHES
              </p>
              <h2
                style={{
                  fontFamily: "'Press Start 2P', cursive",
                  fontSize: "24px",
                  margin: 0,
                }}
              >
                Fresh drops
              </h2>
            </div>
            <button className="pill pill-dark">View all ➜</button>
          </div>
          <div className="card-row">
            {relatedLoading ? (
              Array.from({ length: 6 }).map((_, idx) => (
                <LoadingCard key={idx} />
              ))
            ) : relatedGames.length > 0 ? (
              relatedGames.map((g) => (
                <GameCard
                  key={g.id || g.gameId}
                  title={g.GameName}
                  img={g.GameThumbnail}
                  playCount={g.playCount}
                  tokenName={g.tokens && g.tokens[0] ? g.tokens[0].name : null}
                  onClick={() => handleGameClick(g)}
                />
              ))
            ) : (
              <div
                style={{ padding: "2rem", textAlign: "center", color: "#888" }}
              >
                No related games found
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
