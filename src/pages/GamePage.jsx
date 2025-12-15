import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react'
import { useTonAddress, useTonConnectUI } from '@tonconnect/ui-react'
import { navigate, getNavigationState } from '../navigation'
// import { useGameById } from '../hooks/useGames'
import TradeInterface from '../components/TradeInterface'
import Chart from '../components/Chart'
import heroBg from '../assets/herosection/Mask group (3).png'
import Bg01 from '../assets/herosection/Bg01.png'
import top1 from '../assets/toplaunches/Frame 48.png'

// const WEBSOCKET_URL = 'ws://localhost:8081'; // Local WebSocket server
const WEBSOCKET_URL = 'wss://wssignals.sonicengine.net'; // Production WebSocket server
const TOKEN_DATA_WS_URL = 'wss://wsdata.sonicengine.net/';
import { useGameById, useGames } from "../hooks/useGames";

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

  // Chart & Toggle Logic
  const [activeView, setActiveView] = useState('game'); // 'game' | 'chart'
  const [chartData, setChartData] = useState([]);
  const [selectedInterval, setSelectedInterval] = useState('1D');
  const [chartLoading, setChartLoading] = useState(false);
  const wsRef = useRef(null);
  const GraphData = useRef([]);

  const [liveTokenData, setLiveTokenData] = useState({
    price: null,
    change: null,
    marketCap: null,
    liquidity: null,
    fdv: null,
    totalSupply: null,
  });
  const tokenWsRef = useRef(null);


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
  const tokenAddress = token?.mintPublicKey;

  const tokenWithLiveData = useMemo(() => {
    const hasAnyLive =
      liveTokenData &&
      Object.values(liveTokenData).some(v => v !== null && v !== undefined);
    if (!hasAnyLive) return token;
    return {
      ...token,
      price:
        typeof liveTokenData.price === 'number' && Number.isFinite(liveTokenData.price)
          ? liveTokenData.price
          : token?.price,
      change: liveTokenData.change ?? token?.change,
      marketCap: liveTokenData.marketCap ?? token?.marketCap,
      liquidity: liveTokenData.liquidity ?? token?.liquidity,
      fdv: liveTokenData.fdv ?? token?.fdv,
      totalSupply: liveTokenData.totalSupply ?? token?.totalSupply,
    };
  }, [token, liveTokenData]);

  const formatCurrency = useCallback((value) => {
    if (value === null || value === undefined) return '—';
    const numberValue = typeof value === 'string' ? Number(value) : value;
    if (!Number.isFinite(numberValue)) return '—';
    const abs = Math.abs(numberValue);
    const maximumFractionDigits =
      abs > 0 && abs < 1e-6 ? 12 : abs > 0 && abs < 1e-4 ? 8 : abs < 0.01 ? 6 : 2;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits,
    }).format(numberValue);
  }, []);

  const formatNumber = useCallback((value) => {
    if (value === null || value === undefined) return '—';
    const numberValue = typeof value === 'string' ? Number(value) : value;
    if (!Number.isFinite(numberValue)) return '—';
    return new Intl.NumberFormat('en-US', {
      notation: numberValue >= 1_000_000 ? 'compact' : 'standard',
      maximumFractionDigits: 2,
    }).format(numberValue);
  }, []);

  // Handle WebSocket connection for Chart
  useEffect(() => {
    if (activeView === 'chart' && tokenAddress) {
      console.log('Hero: Initializing WebSocket connection for interval:', selectedInterval);
      setChartLoading(true);

      const ws = new WebSocket(WEBSOCKET_URL);
      wsRef.current = ws;

      ws.onopen = () => {
        ws.send(JSON.stringify({
          op: 'subscribe',
          args: [{
            address: tokenAddress,
            interval: selectedInterval,
          }],
        }));
      };

      ws.onmessage = event => {
        try {
          const message = JSON.parse(event.data);

          if (message.type === 'connection' || message.type === 'subscribed') return;

          if (message.success && message.data) {
            const { interval: receivedInterval, historicalPrices: wsData } = message.data;

            if (receivedInterval !== selectedInterval) return;

            if (wsData && Array.isArray(wsData) && wsData.length > 0) {
              GraphData.current = wsData;
              setChartData(wsData);
              setChartLoading(false);
            }
          } else if (message.success === false) {
            setChartLoading(false);
          }
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
          setChartLoading(false);
        }
      };

      ws.onclose = () => { };
      ws.onerror = error => {
        console.error('WebSocket error:', error);
        setChartLoading(false);
      };

      return () => {
        if (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING) {
          ws.close();
        }
      };
    } else {
      setChartLoading(false);
    }
  }, [activeView, selectedInterval, tokenAddress]);

  // Handle WebSocket connection for live token data (price/market cap/liquidity/etc.)
  useEffect(() => {
    if (!tokenAddress) {
      setLiveTokenData({
        price: null,
        change: null,
        marketCap: null,
        liquidity: null,
        fdv: null,
        totalSupply: null,
      });
      return;
    }

    let isClosed = false;

    const closeExisting = () => {
      const existing = tokenWsRef.current;
      if (!existing) return;
      try {
        if (existing.readyState === WebSocket.OPEN || existing.readyState === WebSocket.CONNECTING) {
          existing.close();
        }
      } catch {
        // ignore
      } finally {
        tokenWsRef.current = null;
      }
    };

    closeExisting();

    const ws = new WebSocket(TOKEN_DATA_WS_URL);
    tokenWsRef.current = ws;

    ws.onopen = () => {
      const normalizedChain = String(token?.chain || '').toLowerCase();
      const tokenChain =
        normalizedChain === 'ton'
          ? 'ton'
          : normalizedChain === 'bnb' || normalizedChain === 'bsc'
            ? 'bsc'
            : 'solana';

      ws.send(
        JSON.stringify({
          op: 'subscribe',
          args: [{ address: tokenAddress, chain: tokenChain }],
        })
      );
    };

    ws.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);
        const normalizedAddress = String(tokenAddress);
        const msgAddress = msg?.data?.address;
        const isDirectMatch =
          typeof msgAddress === 'string' &&
          msgAddress.toLowerCase() === normalizedAddress.toLowerCase();

        const tokenData = isDirectMatch
          ? msg?.data
          : msg?.data?.[normalizedAddress] ??
            msg?.data?.[normalizedAddress.toLowerCase()] ??
            msg?.data?.[normalizedAddress.toUpperCase()];

        if (!msg?.success || !tokenData) {
          if (isDev && (msg?.type === 'update' || msg?.type === 'subscribed')) {
            console.log('[GamePage] Token WS message (ignored):', msg);
          }
          return;
        }

        setLiveTokenData({
          price: tokenData.price ?? null,
          change: tokenData.price_change_percent ?? null,
          marketCap: tokenData.market_cap ?? null,
          liquidity: tokenData.liquidity ?? null,
          fdv: tokenData.fdv ?? null,
          totalSupply: tokenData.total_supply ?? null,
        });
      } catch (err) {
        if (isDev) console.error('[GamePage] Error parsing token ws message:', err);
      }
    };

    ws.onerror = (err) => {
      if (isDev) console.error('[GamePage] Token data WebSocket error:', err);
    };

    ws.onclose = () => {
      if (isClosed) return;
      tokenWsRef.current = null;
    };

    return () => {
      isClosed = true;
      closeExisting();
    };
  }, [tokenAddress, token?.chain]);

  const handleIntervalChange = useCallback(interval => {
    console.log('Hero: Interval changed to:', interval);
    if (wsRef.current && (wsRef.current.readyState === WebSocket.OPEN || wsRef.current.readyState === WebSocket.CONNECTING)) {
      wsRef.current.close();
      wsRef.current = null;
    }
    setChartLoading(true);
    setSelectedInterval(interval);
  }, []);

  const fetchHistoricalPrices = useCallback(async interval => {
    console.log('Fetching historical prices for interval:', interval);
    return chartData;
  }, [chartData]);


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
            <button className="btn-p2e" type="button" onClick={() => navigate('/explore')}>
                      GEME WORLD
                    </button>
            <button className="btn-connect" type="button" onClick={() => tonConnectUI.openModal()}>
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

              {/* Toggle Icons Container - similar to sonicengine */}
              {token?.mintPublicKey && (
                <div style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 50, display: 'flex', gap: '10px' }}>
                  {activeView === 'chart' ? (
                    <div className="svg-container" onClick={() => setActiveView('game')} style={{ cursor: 'pointer', background: 'rgba(0,0,0,0.5)', padding: '8px', borderRadius: '8px' }}>
                      {/* Toggle to Game Icon (Cross or similar to show closing chart/returning to game) - Using Gamepad icon for simplicity or the one from source */}
                      <svg className="MuiSvgIcon-root" focusable="false" viewBox="0 0 16 16" aria-hidden="true" width="24" height="24" fill="none">
                        <path fill="currentColor" d="M5.31331 10.6667L3.33331 12.6667C3.11331 12.8667 2.81998 13 2.49998 13C2.19056 13 1.89381 12.8771 1.67502 12.6583C1.45623 12.4395 1.33331 12.1428 1.33331 11.8333V11.6667L1.99998 6.74667C2.06719 5.99709 2.41221 5.29972 2.96729 4.79151C3.52237 4.2833 4.24739 4.00099 4.99998 4H11C12.5733 4 13.86 5.20667 14 6.74667L14.6666 11.6667V11.8333C14.6666 12.1428 14.5437 12.4395 14.3249 12.6583C14.1061 12.8771 13.8094 13 13.5 13C13.18 13 12.8866 12.8667 12.6666 12.6667L10.6866 10.6667H5.31331ZM4.66665 5.33333V6.66667H3.33331V7.33333H4.66665V8.66667H5.33331V7.33333H6.66665V6.66667H5.33331V5.33333H4.66665ZM11 5.33333C10.8674 5.33333 10.7402 5.38601 10.6464 5.47978C10.5527 5.57355 10.5 5.70073 10.5 5.83333C10.5 5.96594 10.5527 6.09312 10.6464 6.18689C10.7402 6.28065 10.8674 6.33333 11 6.33333C11.1326 6.33333 11.2598 6.28065 11.3535 6.18689C11.4473 6.09312 11.5 5.96594 11.5 5.83333C11.5 5.70073 11.4473 5.57355 11.3535 5.47978C11.2598 5.38601 11.1326 5.33333 11 5.33333ZM9.83331 6.5C9.7007 6.5 9.57353 6.55268 9.47976 6.64645C9.38599 6.74022 9.33331 6.86739 9.33331 7C9.33331 7.13261 9.38599 7.25978 9.47976 7.35355C9.57353 7.44732 9.7007 7.5 9.83331 7.5C9.96592 7.5 10.0931 7.44732 10.1869 7.35355C10.2806 7.25978 10.3333 7.13261 10.3333 7C10.3333 6.86739 10.2806 6.74022 10.1869 6.64645C10.0931 6.55268 9.96592 6.5 9.83331 6.5ZM12.1666 6.5C12.034 6.5 11.9069 6.55268 11.8131 6.64645C11.7193 6.74022 11.6666 6.86739 11.6666 7C11.6666 7.13261 11.7193 7.25978 11.8131 7.35355C11.9069 7.44732 12.034 7.5 12.1666 7.5C12.2993 7.5 12.4264 7.44732 12.5202 7.35355C12.614 7.25978 12.6666 7.13261 12.6666 7C12.6666 6.86739 12.614 6.74022 12.5202 6.64645C12.4264 6.55268 12.2993 6.5 12.1666 6.5ZM11 7.66667C10.8674 7.66667 10.7402 7.71935 10.6464 7.81311C10.5527 7.90688 10.5 8.03406 10.5 8.16667C10.5 8.29927 10.5527 8.42645 10.6464 8.52022C10.7402 8.61399 10.8674 8.66667 11 8.66667C11.1326 8.66667 11.2598 8.61399 11.3535 8.52022C11.4473 8.42645 11.5 8.29927 11.5 8.16667C11.5 8.03406 11.4473 7.90688 11.3535 7.81311C11.2598 7.71935 11.1326 7.66667 11 7.66667Z" />
                      </svg>
                    </div>
                  ) : (
                    <div className="svg-container" onClick={() => setActiveView('chart')} style={{ cursor: 'pointer', background: 'rgba(0,0,0,0.5)', padding: '8px', borderRadius: '8px' }}>
                      {/* Toggle to Chart Icon */}
                      <svg width="24" height="24" viewBox="0 0 33 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.6875 22.1427V27.3587C2.6875 27.676 2.9421 27.9404 3.26198 27.9404H7.24417C7.55753 27.9404 7.81866 27.6826 7.81866 27.3587V18.1828L4.92667 21.1114C4.31302 21.7262 3.52964 22.0832 2.6875 22.1427Z" fill="currentColor" />
                        <path d="M9.80273 18.1167V27.3587C9.80273 27.676 10.0573 27.9404 10.3772 27.9404H14.3594C14.6728 27.9404 14.9339 27.6826 14.9339 27.3587V21.918C14.0265 21.8981 13.1778 21.5345 12.538 20.8867L9.80273 18.1167Z" fill="currentColor" />
                        <path d="M16.918 21.3428V27.3587C16.918 27.676 17.1726 27.9404 17.4924 27.9404H21.4746C21.788 27.9404 22.0491 27.6826 22.0491 27.3587V16.2591L17.4859 20.88C17.3097 21.0585 17.1203 21.2106 16.918 21.3428Z" fill="currentColor" />
                        <path d="M28.7792 9.43672L24.0332 14.2428V27.3587C24.0332 27.676 24.2878 27.9404 24.6077 27.9404H28.5899C28.9032 27.9404 29.1644 27.6826 29.1644 27.3587V9.80032C29.0338 9.68793 28.9359 9.58877 28.8641 9.52266L28.7792 9.43672Z" fill="currentColor" />
                        <path d="M32.0382 0.921976C31.8489 0.71704 31.5617 0.611267 31.1961 0.611267C31.1635 0.611267 31.1243 0.611267 31.0917 0.611267C29.2376 0.697208 27.3902 0.789759 25.5362 0.8757C25.2881 0.888922 24.9486 0.902143 24.681 1.17319C24.5961 1.25913 24.5308 1.35829 24.4786 1.47728C24.2044 2.07887 24.5896 2.46891 24.7724 2.65401L25.2359 3.12999C25.5557 3.46053 25.8822 3.79107 26.2086 4.115L15.0062 15.4658L9.97296 10.3688C9.67267 10.0647 9.26792 9.89286 8.83706 9.89286C8.4062 9.89286 8.00798 10.0647 7.70768 10.3688L1.00323 17.1515C0.376527 17.7862 0.376527 18.8109 1.00323 19.4455L1.30353 19.7496C1.60383 20.0537 2.00857 20.2256 2.43943 20.2256C2.87029 20.2256 3.26851 20.0537 3.56881 19.7496L8.83706 14.4147L13.8703 19.5116C14.1706 19.8157 14.5753 19.9876 15.0062 19.9876C15.4371 19.9876 15.8353 19.8157 16.1421 19.5116L28.7807 6.71306L30.2103 8.15422C30.3801 8.3261 30.6151 8.56409 30.9741 8.56409C31.1243 8.56409 31.2744 8.52442 31.4311 8.43848C31.5356 8.37898 31.627 8.31288 31.7053 8.23355C31.986 7.94928 32.0382 7.58569 32.0513 7.30142C32.1035 6.08503 32.1623 4.86864 32.221 3.64563L32.3059 1.81444C32.3255 1.43101 32.2406 1.13352 32.0382 0.921976Z" fill="currentColor" />
                      </svg>
                    </div>
                  )}
                </div>
              )}

              <div className="gd-media" ref={mediaRef} style={{ height: activeView === 'chart' ? '600px' : undefined }}>
                {activeView === 'chart' ? (
                  <div style={{ width: '100%', height: '100%' }}>
                    {chartLoading && !chartData.length ? (
                      <div style={{
                        width: '100%',
                        height: '100%',
                        background: '#1a1a2e',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white'
                      }}>
                        Loading Chart Data...
                      </div>
                    ) : (
                      <Chart
                        symbol={token?.symbol || token?.name || 'Pair'}
                        fetchHistoricalPrices={fetchHistoricalPrices}
                        interval={selectedInterval}
                        onIntervalChange={handleIntervalChange}
                        chartData={chartData}
                      />
                    )}
                  </div>
                ) : loading ? (
                  <div style={{
                    width: '100%',
                    paddingTop: '100%',
                    background: 'linear-gradient(90deg, #1a1a2e 25%, #2a2a3e 50%, #1a1a2e 75%)',
                    backgroundSize: '200% 100%',
                    animation: 'loading 1.5s ease-in-out infinite'
                  }} />
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

              {activeView === 'game' && isPlaying && (
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
              {activeView === 'game' && !isPlaying && (
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
{/* 
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
                </div> */}

                <div className="gd-stats">
                  <StatRow label="Token Symbol:" value={tokenSymbol} />
                  <StatRow label="Token Name:" value={tokenName} />
                  {liveTokenData?.price !== null && (
                    <StatRow label="Token Price:" value={formatCurrency(liveTokenData.price)} />
                  )}
                  {liveTokenData?.change !== null && (
                    <StatRow
                      label="Change:"
                      value={`${Number(liveTokenData.change).toFixed(2)}%`}
                    />
                  )}
                  {liveTokenData?.marketCap !== null && (
                    <StatRow label="Market cap:" value={formatCurrency(liveTokenData.marketCap)} />
                  )}
                  {liveTokenData?.liquidity !== null && (
                    <StatRow label="Liquidity:" value={formatCurrency(liveTokenData.liquidity)} />
                  )}
                  {liveTokenData?.totalSupply !== null && (
                    <StatRow label="Total Supply:" value={formatNumber(liveTokenData.totalSupply)} />
                  )}
                  {liveTokenData?.fdv !== null && (
                    <StatRow label="FDV:" value={formatCurrency(liveTokenData.fdv)} />
                  )}
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

                <TradeInterface token={tokenWithLiveData} game={game} />
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
            <button className="pill pill-dark" onClick={() => navigate('/world/general')}>View all ➜</button>
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
