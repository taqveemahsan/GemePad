import React from 'react'
import heroBg from './assets/herosection/Mask group (3).png'
import Bg01 from './assets/herosection/Bg01.png'
import heroBot from './assets/herosection/Gemini_Generated_Image_k7u1zrk7u1zrk7u1 1.png'
import heroTitleImg from './assets/herosection/GEMEPAD.png'
import top1 from './assets/toplaunches/Frame 48.png'
import top2 from './assets/toplaunches/Frame 51.png'
import top3 from './assets/toplaunches/Frame 52.png'
import top4 from './assets/toplaunches/Frame 53.png'
import top5 from './assets/toplaunches/Frame 54.png'
import top6 from './assets/toplaunches/Frame 55.png'
import pepeHero from './assets/pepegames/Gemini_Generated_Image_betzqrbetzqrbetz 1.png'
import pepeTitle from './assets/pepegames/PEPE Games.png'
import pepeCard1 from './assets/pepegames/Frame 62-card1.png'
import pepeCard2 from './assets/pepegames/Frame 62-card2.png'
import pepeCard3 from './assets/pepegames/Frame 62-card3.png'
import pepeCard4 from './assets/pepegames/Frame 62-card4.png'
import pepeCard5 from './assets/pepegames/Frame 62-card5.png'
import dogeHero from './assets/dogegames/Gemini_Generated_Image_kpdih6kpdih6kpdi 1.png'
import dogeTitle from './assets/dogegames/Doge Games.png'
import dogeCard1 from './assets/dogegames/Frame 64-card1.png'
import dogeCard2 from './assets/dogegames/Frame 64-card2.png'
import dogeCard3 from './assets/dogegames/Frame 64-card3.png'
import dogeCard4 from './assets/dogegames/Frame 64-card4.png'
import yetiHero from './assets/yetidyorgames/Mask group (2).png'
import yetiTitle from './assets/yetidyorgames/Yeti Dyor Games.png'
import yetiCard1 from './assets/yetidyorgames/Frame 65-card1.png'
import yetiCard2 from './assets/yetidyorgames/Frame 65-card2.png'
import yetiCard3 from './assets/yetidyorgames/Frame 65-card3.png'
import yetiCard4 from './assets/yetidyorgames/Frame 65-card4.png'
import yetiCard5 from './assets/yetidyorgames/Frame 65-card5.png'

const chips = ['Token', 'P2E', 'Mini-app', 'Pair-Launch', 'No Code', 'No Tools', 'No Time']

const topLaunches = [
  { title: 'Uncharted 4', img: top1 },
  { title: 'Elden Ring', img: top2 },
  { title: 'Spider-Man 2', img: top3 },
  { title: 'Horizon', img: top4 },
  { title: 'Ghosts', img: top5 },
  { title: 'Final Fantasy', img: top6 },
]

const memeSections = [
  {
    id: 'pepe',
    label: 'Pepe Games',
    titleImg: pepeTitle,
    heroImg: pepeHero,
    cards: [pepeCard1, pepeCard2, pepeCard3, pepeCard4, pepeCard5],
    glow: 'rgba(62, 244, 192, 0.4)',
  },
  {
    id: 'doge',
    label: 'Doge Games',
    titleImg: dogeTitle,
    heroImg: dogeHero,
    cards: [dogeCard1, dogeCard2, dogeCard3, dogeCard4],
    glow: 'rgba(255, 191, 0, 0.4)',
  },
  {
    id: 'yeti',
    label: 'Yeti DYOR Games',
    titleImg: yetiTitle,
    heroImg: yetiHero,
    cards: [yetiCard1, yetiCard2, yetiCard3, yetiCard4, yetiCard5],
    glow: 'rgba(198, 26, 231, 0.35)',
  },
]

const leaderboardRows = [
  {
    game: 'Magic Heroes',
    cap: '$154,587,180',
    players: '18k',
    buyers: '153,212',
    revenue: '$4,787,208',
    asset: '$145,599',
  },
  {
    game: 'Crypto Run',
    cap: '$98,422,610',
    players: '12k',
    buyers: '122,100',
    revenue: '$2,144,788',
    asset: '$88,102',
  },
  {
    game: 'Meta City',
    cap: '$65,100,500',
    players: '10k',
    buyers: '101,020',
    revenue: '$1,880,123',
    asset: '$62,101',
  },
]

const topPlayer = {
  name: 'User Name',
  rank: '#1',
  xgp: '1585.6',
  volume: '$264,528',
  buyer: '$145,528',
}

function TagChip({ label }) {
  return <span className="chip">{label}</span>
}

function GameCard({ title, img, tokenName, tokenImg }) {
  return (
    <div className="game-card">
      <div className="game-card__media">
        <img src={img} alt={title} />
        <div className="badge">12k Players</div>
      </div>
      <div className="game-card__body">
        <h4>{title}</h4>
        {tokenName && (
          <div className="game-card__info">
            {tokenImg && <img src={tokenImg} alt={tokenName} />}
            <span>{tokenName}</span>
            <span>$0.058</span>
          </div>
        )}
        <button className="btn-play">▶ PLAY</button>
      </div>
    </div>
  )
}

function MemeSection({ section }) {
  return (
    <section id={section.id} className={`meme-panel ${section.id}-section`}>
      <div className="meme-panel__body">
        <div className="meme-panel__header">
          <div className="meme-panel__header-left">
            <img src={section.titleImg} alt={section.label} className="meme-title" />
          </div>
          <button className="meme-panel__view-all">View all ›</button>
        </div>
        <div className="meme-panel__cards">
          {section.cards.slice(0, 4).map((card, idx) => (
            <GameCard
              key={card + idx}
              title={`GAME NAME HERE`}
              img={card}
              tokenName="Token Name"
            />
          ))}
        </div>
        <div className="meme-panel__progress">
          <div className="progress-bar">
            <div className="progress-bar__fill"></div>
          </div>
        </div>
      </div>
      <div className="meme-panel__art">
        <img src={section.heroImg} alt={section.label} />
      </div>
    </section>
  )
}

export default function App() {
  return (
    <div className="page">
      <div className="page__bg-container">
        <img src={Bg01} alt="" className="page__main-bg" />
      </div>

      <header className="hero">
        <div className="hero__topbar">
          {/* Left Group */}
          <div className="nav-left">
            <div className="logo">GEMEPAD.FUN</div>
            <button className="btn-create">CREATE GAME</button>
          </div>

          {/* Center */}
          <div className="search">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input type="text" placeholder="Search games here..." />
          </div>

          {/* Right Group */}
          <div className="nav-right">
            <button className="btn-p2e">PLAY TO EARN</button>
            <button className="btn-connect">CONNECT WALLET</button>
          </div>
        </div>


        <div className="hero__frame" style={{ '--hero-bg': `url("${heroBg}")` }}>
          <div className="hero__content">
            <div className="hero__center">
              <div className="hero__chips-container">
                {chips.map((chip, idx) => (
                  <div key={chip} className={`hero-chip chip-${idx}`}>{chip}</div>
                ))}
              </div>
              <div className="hero__title-large">
                <img src={heroTitleImg} alt="GEMEPAD" className="hero-title-img" />
              </div>
              <div className="hero__cta-container">
                <button className="btn-cta-main">
                  MAKE A GAME IN 5 MIN
                  <span className="sub-text">DEPLOY ON TON, PLAY ON TELEGRAM</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Robot moved OUTSIDE frame to be "sb sa uper" */}
        <img src={heroBot} alt="Robot" className="hero__bot-large" />
      </header>

      <main className="content">
        <section className="panel">
          <div className="section-header">
            <div>
              <p className="eyebrow">Top Launches</p>
              <h2>Fresh drops</h2>
            </div>
            <button className="pill pill-dark">View all ➜</button>
          </div>
          <div className="card-row">
            {topLaunches.map((game) => (
              <GameCard key={game.title} title={game.title} img={game.img} />
            ))}
          </div>
        </section>

        <section className="geme-world-header">
          <div className="geme-world-header__title">
            <span className="text-white">GEME</span>
            <span className="text-purple">WORLD</span>
          </div>
          <p className="geme-world-header__description">
            Explore Geme Worlds like Pepe, Doge, Bonk & more — each with its own style, characters and unique mini-games to play.
          </p>
          <button className="btn-explore-worlds">EXPLORE ALL WORLDS</button>
        </section>

        {memeSections.map((section) => (
          <MemeSection key={section.id} section={section} />
        ))}

        <section className="panel leaderboard">
          <div className="section-header">
            <div>
              <p className="eyebrow">Leaderboard</p>
              <h2>Top performing games</h2>
            </div>
          </div>
          <div className="leaderboard__content">
            <table>
              <thead>
                <tr>
                  <th>Game</th>
                  <th>Market Cap</th>
                  <th>Players</th>
                  <th>Total Buyers</th>
                  <th>Revenue</th>
                  <th>Asset Cap</th>
                </tr>
              </thead>
              <tbody>
                {leaderboardRows.map((row) => (
                  <tr key={row.game}>
                    <td>{row.game}</td>
                    <td>{row.cap}</td>
                    <td>{row.players}</td>
                    <td>{row.buyers}</td>
                    <td>{row.revenue}</td>
                    <td>{row.asset}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="top-player">
              <div className="eyebrow">Top Player</div>
              <h3>{topPlayer.name}</h3>
              <p>Ranking {topPlayer.rank}</p>
              <div className="stat"><span>XGP Earned</span><strong>{topPlayer.xgp}</strong></div>
              <div className="stat"><span>Exchange Volume</span><strong>{topPlayer.volume}</strong></div>
              <div className="stat"><span>Top Buyer</span><strong>{topPlayer.buyer}</strong></div>
              <button className="btn-primary">View</button>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer__brand">GEMEPAD.FUN</div>
        <div className="footer__links">
          <a href="#">About</a>
          <a href="#">Docs</a>
          <a href="#">Help</a>
          <a href="#">Careers</a>
        </div>
        <div className="footer__copy">© 2024 Gemepad. All rights reserved.</div>
      </footer>
    </div>
  )
}
