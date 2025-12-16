import React, { useState } from 'react'
import { navigate } from '../navigation'
import Header from '../components/Header'
import bg01 from '../assets/herosection/Bg01.png'

// Explore assets
import exploreHero from '../assets/explore/hero.png'
import card1 from '../assets/explore/1.png'
import card2 from '../assets/explore/2.png'
import card3 from '../assets/explore/3.png'
import card4 from '../assets/explore/4.png'
import card5 from '../assets/explore/5.png'
import card6 from '../assets/explore/6.png'
import card7 from '../assets/explore/7.png'
import card8 from '../assets/explore/8.png'
import card9 from '../assets/explore/9.png'
import generalWorld from '../assets/General_World.png'

const worldsData = [
    {
        id: 'general',
        title: 'GENERAL WORLD',
        description: '',
        color: '#FFFFFF',
        image: generalWorld
    },
    {
        id: 'rocky',
        title: 'ROCKY RABBIT GAMES',
        description: '',
        color: '#00D1FF', // Cyan Blue
        image: card1
    },
    {
        id: 'phantom',
        title: 'PHANTOM WORLD',
        description: '',
        color: '#FF69B4', // Hot Pink
        image: card2
    },
    {
        id: 'uniswap',
        title: 'UNISWAP WORLD',
        description: '',
        color: '#00D1FF', // Cyan
        image: card3
    },
    {
        id: 'metamask',
        title: 'METAMASK WORLD',
        description: '',
        color: '#FF8800', // Orange
        image: card4
    },
    {
        id: 'link',
        title: 'LINK WORLD',
        description: '',
        color: '#00A3FF', // Light Blue
        image: card5
    },
    {
        id: 'sushiswap',
        title: 'SUSHISWAP',
        description: '',
        color: '#00D1FF', // Cyan
        image: card6
    },
    {
        id: 'pepe',
        title: 'PEPE WORLD',
        description: '',
        color: '#3EF4C0', // Green
        image: card7
    },
    {
        id: 'doge',
        title: 'DOGE WORLD',
        description: '',
        color: '#FFBF00', // Gold/Orange
        image: card8
    },
    {
        id: 'yeti',
        title: 'YETI WORLD',
        description: '',
        color: '#3EF4C0', // Greenish Cyan
        image: card9
    },
]

function WorldCard({ world }) {
    return (
        <button
            type="button"
            className="world-card-button"
            onClick={() => navigate(`/world/${world.id}`)}
            aria-label={world.title}
        >
            <img
                src={world.image}
                alt={world.title}
                className="world-card-img-only"
                loading="lazy"
                decoding="async"
            />
        </button>
    )
}

export default function ExploreWorlds() {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredWorlds = worldsData.filter(world =>
        world.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="page explore-page">
            <div className="page__bg-container">
                <img src={bg01} alt="" className="page__main-bg explore-bg" loading="lazy" decoding="async" />
            </div>

            <header className="explore-hero">
                <Header />

                <div className="explore-hero__content">
                    <div className="explore-hero__title-group">
                        <h1 className="explore-title">
                            <span className="text-white">GEME</span> <span className="text-purple">WORLD</span>
                        </h1>
                        <div className="explore-hero__image-wrapper">
                            <img src={exploreHero} alt="Geme Worlds Characters" className="explore-hero-img" />
                        </div>
                    </div>
                </div>
            </header>

            <div className="explore-controls">
                <div className="search-bar">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    <input
                        type="text"
                        placeholder="Search Worlds..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="filter-dropdown">
                    <span>Popular</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
                </div>
            </div>

            <div className="worlds-grid">
                {filteredWorlds.map((world, idx) => (
                    <WorldCard key={idx} world={world} />
                ))}
            </div>



            <style jsx>{`
        .explore-page {
          min-height: 100vh;
          color: white;
          padding-bottom: 2rem;
        }
        .explore-hero {
          position: relative;
          text-align: center;
          padding-top: 1rem;
          margin-bottom: 3rem;
          padding-left: 1rem;
          padding-right: 1rem;
        }
        
        /* Title styling with pixel font */
        .explore-title {
          font-family: 'Press Start 2P', cursive;
          font-size: 4rem;
          text-transform: uppercase;
          margin-bottom: 0;
          line-height: 1;
          position: relative;
          z-index: 5; /* On top of image */
          
          /* Glow effects */
          text-shadow: 
             0 0 10px rgba(139, 92, 246, 0.8),
             0 0 20px rgba(139, 92, 246, 0.5);
        }
        
        .text-purple { color: #D946EF; }
        
        .explore-hero__image-wrapper {
             max-width: 1600px;
             margin: -2rem auto 0; /* Pull image up behind/under title slightly or just below */
             position: relative;
             z-index: 1;
             display: flex;
             justify-content: center;
        }
        
        .explore-hero-img {
            width: 100%;
            max-width: 1600px;
            height: auto;
            object-fit: contain;
            /* Enhance the glow/integration */
            filter: drop-shadow(0 0 40px rgba(168, 85, 247, 0.4));
        }

        /* Controls: Search and Filter */
        .explore-controls {
           max-width: 1600px;
           margin: 0 auto 3rem;
           padding: 0 1rem;
           display: flex;
           gap: 1rem;
        }
        .search-bar {
           flex: 1;
           background: rgba(255, 255, 255, 0.08); /* More translucent/brighter than flat dark */
           border: 1px solid rgba(255, 255, 255, 0.1);
           border-radius: 6px;
           display: flex;
           align-items: center;
           padding: 0 1rem;
           height: 48px;
           transition: all 0.3s;
        }
        .search-bar:focus-within {
           background: rgba(255, 255, 255, 0.12);
           border-color: rgba(168, 85, 247, 0.5);
           box-shadow: 0 0 15px rgba(168, 85, 247, 0.2);
        }
        .search-bar input {
           background: transparent;
           border: none;
           color: white; /* Brighter text */
           font-size: 0.9rem;
           width: 100%;
           margin-left: 0.5rem;
           outline: none;
        }
        .search-bar input::placeholder {
            color: rgba(255, 255, 255, 0.5);
        }
        .filter-dropdown {
           background: rgba(255, 255, 255, 0.08);
           border: 1px solid rgba(255, 255, 255, 0.1);
           border-radius: 6px;
           padding: 0 1.5rem;
           height: 48px;
           display: flex;
           align-items: center;
           gap: 2rem;
           cursor: pointer;
           color: white;
           font-size: 0.9rem;
           transition: all 0.3s;
        }
        .filter-dropdown:hover {
           background: rgba(255, 255, 255, 0.15);
        }

        /* Grid */
        .worlds-grid {
           display: grid;
           grid-template-columns: repeat(3, minmax(0, 1fr));
           gap: 1.5rem;
           max-width: 1600px;
           margin: 0 auto;
           padding: 0 1rem;
        }

        .world-card-button {
            display: block;
            width: 100%;
            padding: 0;
            border: 0;
            background: transparent;
            cursor: pointer;
            border-radius: 0;
            transform: translateZ(0);
            transition: transform 160ms ease, filter 160ms ease;
        }
        .world-card-button:hover {
            transform: translateY(-4px) scale(1.01);
            filter: brightness(1.06);
        }
        .world-card-button:active {
            transform: translateY(-1px) scale(1.005);
        }

        .world-card-img-only {
            width: 100%;
            height: 100%;
            display: block;
            object-fit: contain;
            background: transparent;
            border-radius: 0;
        }

        .explore-bg {
            position: fixed;
            inset: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            opacity: 0.75;
        }



        @media (max-width: 1100px) {
           .worlds-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }

        @media (max-width: 768px) {
           .explore-title {
             font-size: 2.2rem;
             margin-bottom: 0.5rem;
           }
           .explore-hero {
             padding-top: 2rem;
             margin-bottom: 2rem;
           }
           .explore-hero__image-wrapper {
             max-width: 100%;
             margin-top: -1rem;
           }
           .explore-hero-img {
             padding: 0 1rem;
           }
           .explore-controls {
             flex-direction: row;
             gap: 0.75rem;
             margin-bottom: 2rem;
           }
           .worlds-grid {
             grid-template-columns: 1fr;
             gap: 1rem;
             padding: 0 1.5rem;
           }
           .search-bar {
             width: auto;
             flex: 1;
             height: 48px;
             font-size: 0.9rem;
           }
           .filter-dropdown {
             width: auto;
             height: 48px;
             font-size: 0.9rem;
             padding: 0 1rem;
             flex-shrink: 0;
           }
        }
      `}</style>
        </div>
    )
}
