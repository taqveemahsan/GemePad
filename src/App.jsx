import React, { useCallback, useEffect, useRef, useState } from "react";
import { useTonConnectUI } from "@tonconnect/ui-react";
import Header from "./components/Header";
import { isTelegramMiniApp, openTelegramLink } from "./utils/telegram";
import footerBg from "./assets/Component_Bg.png";
import heroBg from "./assets/herosection/Mask group (3).png";
import Bg01 from "./assets/herosection/Bg01.png";
import heroBot from "./assets/herosection/Hero_Right_side.png";
import heroTitleImg from "./assets/herosection/GEMEPAD.png";
import top1 from "./assets/toplaunches/Frame 48.png";
import top2 from "./assets/toplaunches/Frame 51.png";
import top3 from "./assets/toplaunches/Frame 52.png";
import top4 from "./assets/toplaunches/Frame 53.png";
import top5 from "./assets/toplaunches/Frame 54.png";
import top6 from "./assets/toplaunches/Frame 55.png";
import pepeHero from "./assets/pepegames/Gemini_Generated_Image_betzqrbetzqrbetz 1.png";
import pepeTitle from "./assets/pepegames/PEPE Games.png";
import pepeCard1 from "./assets/PEPE/1.png";
import pepeCard2 from "./assets/PEPE/2.png";
import pepeCard3 from "./assets/PEPE/3.png";
import pepeCard4 from "./assets/PEPE/4.png";

import uniHero from "./assets/uniiswapworld/Gemini_Generated_Image_mdzxh1mdzxh1mdzx 1.png";
import metaHero from "./assets/Metamask_Hero.png";
import sushiHero from "./assets/sushiswapworld/SUSHISWAP_Hero.png";
import phantomHero from "./assets/phantomworld/Phantom_Hero.png";
import phantomCard1 from "./assets/Phantom/1.png";
import phantomCard2 from "./assets/Phantom/2.png";
import phantomCard3 from "./assets/Phantom/3.png";
import phantomCard4 from "./assets/Phantom/4.png";
import sushiCard1 from "./assets/Sushiswap/1.png";
import sushiCard2 from "./assets/Sushiswap/2.png";
import sushiCard3 from "./assets/Sushiswap/3.png";
import sushiCard4 from "./assets/Sushiswap/4.png";
import uniCard1 from "./assets/Uniswap/1.png";
import uniCard2 from "./assets/Uniswap/2.png";
import uniCard3 from "./assets/Uniswap/3.png";
import uniCard4 from "./assets/Uniswap/4.png";
import metaCard1 from "./assets/Metamask/1.png";
import metaCard2 from "./assets/Metamask/2.png";
import metaCard3 from "./assets/Metamask/3.png";
import metaCard4 from "./assets/Metamask/4.png";
import metaCard5 from "./assets/Metamask/5.png";
import pepeCard5 from "./assets/PEPE/5.png";
import phantomCard5 from "./assets/Phantom/5.png";
import sushiCard5 from "./assets/Sushiswap/5.png";
import uniCard5 from "./assets/Uniswap/5.png";
import threeHeros from "./assets/mobileAssets/threeHeros.png";
import threeSushiSwamp from "./assets/mobileAssets/threeSushiSwamp.png";
import threeHorses from "./assets/mobileAssets/threeHorses.png";
import threeMetamask from "./assets/mobileAssets/threeMetamask.png";
import threePhantom from "./assets/mobileAssets/threePhantom.png";
import threePepe from "./assets/mobileAssets/threePepe.png";
import { navigate } from "./navigation";
import { useGames } from "./hooks/useGames";
import LeaderboardSection from "./components/LeaderboardSection";

const isDev = import.meta?.env?.DEV;

const chips = [
  "Token",
  "P2E",
  "Mini-app",
  "Pair-Launch",
  "No Code",
  "No Tools",
  "No Time",
];

const topLaunches = [
  { title: "Uncharted 4", img: top1 },
  { title: "Elden Ring", img: top2 },
  { title: "Spider-Man 2", img: top3 },
  { title: "Horizon", img: top4 },
  { title: "Ghosts", img: top5 },
  { title: "Final Fantasy", img: top6 },
];

const memeSections = [
  {
    id: "uniswap",
    theme: "uniswap",
    label: "UniSwap Games",
    titleText: "UNISWAP GAMES",
    titleImg: null,
    heroImg: uniHero,
    mobileHeroImg: threeHorses,
    cards: [uniCard1, uniCard2, uniCard3, uniCard4, uniCard5],
    glow: "rgba(104, 210, 255, 0.35)",
    viewAllRoute: "/world/uniswap",
  },
  {
    id: "metamask",
    theme: "metamask",
    label: "MetaMask Games",
    titleText: "METAMASK GAMES",
    titleImg: null,
    heroImg: metaHero,
    mobileHeroImg: threeMetamask,
    cards: [metaCard1, metaCard2, metaCard3, metaCard4, metaCard5],
    glow: "rgba(255, 133, 33, 0.35)",
    viewAllRoute: "/world/metamask",
  },
  {
    id: "sushiswap",
    theme: "sushiswap",
    label: "SushiSwap Games",
    titleText: "SUSHISWAP GAMES",
    titleImg: null,
    heroImg: sushiHero,
    mobileHeroImg: threeSushiSwamp,
    cards: [sushiCard1, sushiCard2, sushiCard3, sushiCard4, sushiCard5],
    glow: "rgba(120, 136, 255, 0.35)",
    viewAllRoute: "/world/sushiswap",
  },
  {
    id: "phantom",
    theme: "phantom",
    label: "Phantom Games",
    titleText: "PHANTOM GAMES",
    titleImg: null, // Using text for now as per design text, unless image exists
    heroImg: phantomHero,
    mobileHeroImg: threePhantom,
    cards: [
      phantomCard1,
      phantomCard2,
      phantomCard3,
      phantomCard4,
      phantomCard5,
    ], // Repeating for scroll
    glow: "rgba(255, 58, 255, 0.35)",
    viewAllRoute: "/world/phantom",
  },
  {
    id: "pepe",
    theme: "pepe",
    label: "Pepe Games",
    titleText: "PEPE GAMES",
    titleImg: null,
    heroImg: pepeHero,
    mobileHeroImg: threePepe,
    cards: [pepeCard1, pepeCard2, pepeCard3, pepeCard4, pepeCard5],
    glow: "rgba(62, 244, 192, 0.4)",
    viewAllRoute: "/world/pepe",
  },
];

function TagChip({ label }) {
  return <span className="chip">{label}</span>;
}

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
            height: "16px",
            background:
              "linear-gradient(90deg, #1a1a2e 25%, #2a2a3e 50%, #1a1a2e 75%)",
            backgroundSize: "200% 100%",
            animation: "loading 1.5s ease-in-out infinite",
            borderRadius: "4px",
            width: "60%",
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

import GameCard from "./components/GameCard";

function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handler = (event) => setMatches(event.matches);
    mediaQuery.addEventListener("change", handler);

    return () => mediaQuery.removeEventListener("change", handler);
  }, [query]);

  return matches;
}

function LazyRender({ children, minHeight = 600, rootMargin = "800px" }) {
  const containerRef = useRef(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (shouldRender) return;
    const el = containerRef.current;
    if (!el) return;

    if (!("IntersectionObserver" in window)) {
      setShouldRender(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { root: null, rootMargin, threshold: 0.01 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin, shouldRender]);

  return (
    <div ref={containerRef} style={!shouldRender ? { minHeight } : undefined}>
      {shouldRender ? children : null}
    </div>
  );
}

const MemeSection = React.memo(function MemeSection({ section }) {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const handleStaticGameClick = useCallback(
    (cardImg, idx) => {
      // Create dummy game data for static cards
      const dummyGame = {
        id: `${section.id}-${idx}`,
        gameId: `${section.id}-${idx}`,
        GameName: "Coming Soon",
        GameDescription: "This game is coming soon! Stay tuned for updates.",
        GameThumbnail: cardImg,
        GameURL: "#",
        playCount: Math.floor(Math.random() * 10000) + 1000,
        tokens: [
          {
            name: "Game Token",
            symbol: "GAME",
            imageUrl: null,
          },
        ],
        p2eEligibility: {
          eligible: false,
        },
      };
      navigate(`/game?id=${dummyGame.id}`, { game: dummyGame });
    },
    [section.id]
  );

  const heroImage =
    isMobile && section.mobileHeroImg ? section.mobileHeroImg : section.heroImg;

  return (
    <section
      id={section.id}
      className={`meme-panel ${section.theme}-section ${section.id}-section`}
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url("${footerBg}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="meme-panel__wrapper">
        <div className="meme-panel__frame">
          <div className="meme-panel__body">
            <div className="meme-panel__header">
              <div className="meme-panel__header-left">
                {section.titleImg ? (
                  <img
                    src={section.titleImg}
                    alt={section.label}
                    className="meme-title"
                  />
                ) : (
                  <h2
                    className={`meme-title-text meme-title-text--${section.theme}`}
                  >
                    {section.titleText || section.label}
                  </h2>
                )}
              </div>
            </div>
            <div className="meme-panel__cards">
              {section.cards.slice(0, 5).map((card, idx) => (
                <GameCard
                  key={idx}
                  title="GAME NAME HERE"
                  img={card}
                  tokenName="Token Name"
                  tokenImg={null}
                  playCount={null}
                  imgLoading="lazy"
                  onClick={() => handleStaticGameClick(card, idx)}
                  isComingSoon={true}
                />
              ))}
            </div>
            <div className="meme-panel__view-row desktop-only">
              <button
                className="meme-panel__view-all"
                onClick={() => navigate(section.viewAllRoute)}
              >
                View all ›
              </button>
            </div>
            <div className="meme-panel__mobile-footer mobile-only">
              <button
                className="meme-panel__view-all"
                onClick={() => navigate(section.viewAllRoute)}
              >
                View all ➜
              </button>
            </div>
            <div className="meme-panel__progress">
              <div className="progress-bar">
                <div className="progress-bar__fill"></div>
              </div>
            </div>
          </div>
          <div className="meme-panel__art" aria-hidden="true">
            <img src={heroImage} alt="" loading="lazy" decoding="async" />
          </div>
        </div>
      </div>
    </section>
  );
});

export default function App() {
  const [tonConnectUI] = useTonConnectUI();
  const [heroBgEnabled, setHeroBgEnabled] = useState(false);

  // Dynamic import for footer background removed as Footer is now a separate component

  const { games, loading, error } = useGames({
    category: "play-to-earn",
    sortBy: "desc",
    page: 1,
    limit: 12,
  });

  useEffect(() => {
    let cancelled = false;
    if (typeof window === "undefined") return;

    const enable = () => {
      if (!cancelled) setHeroBgEnabled(true);
    };

    if (window.requestIdleCallback) {
      const id = window.requestIdleCallback(enable, { timeout: 1500 });
      return () => {
        cancelled = true;
        window.cancelIdleCallback?.(id);
      };
    }

    const t = window.setTimeout(enable, 0);
    return () => {
      cancelled = true;
      window.clearTimeout(t);
    };
  }, []);

  const handleGameClick = useCallback((game) => {
    if (isDev) console.log("🎮 Game Clicked:", game);
    navigate(`/game?id=${game.id || game.gameId}`, { game });
  }, []);

  const handleMakeGameClick = useCallback(() => {
    if (isTelegramMiniApp()) {
      openTelegramLink("https://t.me/gamepadworld_bot/editor");
      return;
    }
    window.open(
      "https://editor.gamepad.world/",
      "_blank",
      "noopener,noreferrer"
    );
  }, []);

  return (
    <div className="page">
      <div className="page__bg-container">
        <img
          src={Bg01}
          alt=""
          className="page__main-bg"
          loading="lazy"
          decoding="async"
          fetchPriority="low"
        />
      </div>

      <header className="hero">
        <Header />

        <div
          className="hero__frame"
          style={{ "--hero-bg": heroBgEnabled ? `url("${heroBg}")` : "none" }}
        >
          <div className="hero__chips-container">
            {chips.map((chip, idx) => (
              <div key={chip} className={`hero-chip chip-${idx}`}>
                {chip}
              </div>
            ))}
          </div>
          <div className="hero__content">
            <div className="hero__center">
              <div className="hero__title-large">
                <img
                  src={heroTitleImg}
                  alt="GAMEPAD"
                  className="hero-title-img"
                  decoding="async"
                  fetchPriority="high"
                />
              </div>
              <div className="hero__cta-container">
                <button
                  className="btn-cta-main"
                  onClick={handleMakeGameClick}
                  type="button"
                >
                  MAKE A GAME IN 5 MIN
                  <span className="sub-text">
                    DEPLOY ON TON, PLAY ON TELEGRAM
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Robot moved OUTSIDE frame to be "sb sa uper" */}
        <div className="hero__bot-container">
          <img
            src={heroBot}
            alt="Robot"
            className="hero__bot-large hero__bot-desktop"
            decoding="async"
            fetchPriority="high"
          />
          <img
            src={threeHeros}
            alt="Three Heroes"
            className="hero__bot-mobile"
            decoding="async"
            fetchPriority="high"
          />
        </div>
      </header>

      <main className="content">
        <section className="top-launches-section">
          <div className="section-header">
            <h2 className="section-title-pixel">
              TOP <span className="text-purple">LAUNCHES</span>
            </h2>
            <button
              className="pill pill-dark"
              onClick={() => navigate("/world/general")}
            >
              View all ➜
            </button>
          </div>
          <div className="card-row">
            {loading ? (
              Array.from({ length: 6 }).map((_, idx) => (
                <LoadingCard key={idx} />
              ))
            ) : games.length > 0 ? (
              games
                .slice(0, 6)
                .map((game, idx) => (
                  <GameCard
                    key={game.id || game.gameId || idx}
                    title={game.GameName}
                    img={game.GameThumbnail}
                    tokenName={
                      game.tokens && game.tokens[0] ? game.tokens[0].name : null
                    }
                    tokenImg={
                      game.tokens && game.tokens[0]
                        ? game.tokens[0].imageUrl
                        : null
                    }
                    playCount={game.playCount}
                    onClick={() => handleGameClick(game)}
                    imgLoading="eager"
                  />
                ))
            ) : (
              <div
                style={{ padding: "2rem", textAlign: "center", color: "#888" }}
              >
                No games available
              </div>
            )}
          </div>
        </section>

        <section className="geme-world-header">
          <div className="geme-world-header__title">
            <span className="text-white">GAME</span>
            <span className="text-purple">WORLD</span>
          </div>
          <p className="geme-world-header__description">
            Explore Game World like Pepe, Doge, Bonk & more — each with its own
            style, characters and unique mini-games to play.
          </p>
          <button
            className="btn-explore-worlds"
            onClick={() => navigate("/explore")}
          >
            EXPLORE ALL WORLDS
          </button>
        </section>

        {memeSections.map((section) => (
          <LazyRender key={section.id} minHeight={900}>
            <MemeSection section={section} />
          </LazyRender>
        ))}

        <LazyRender minHeight={900}>
          <LeaderboardSection
            footerBg={footerBg}
            gameIcons={[top1, top2, top3, top4, top5]}
          />
        </LazyRender>
      </main>
    </div>
  );
}
