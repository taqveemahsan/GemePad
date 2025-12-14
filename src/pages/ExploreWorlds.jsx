import React, { useState } from 'react'
import { navigate } from '../navigation'
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

const worldsData = [
    {
        id: 'rocky',
        title: 'ROCKY RABBIT GAMES',
        description: 'Lorem ipsum dolor sit amet consectetur. Pulvinar egestas nec et egestas eu odio amet iaculis auctor. Rutrum sit aliquam id ia',
        color: '#00D1FF', // Cyan Blue
        image: card1
    },
    {
        id: 'phantom',
        title: 'PHANTOM WORLD',
        description: 'Lorem ipsum dolor sit amet consectetur. Pulvinar egestas nec et egestas eu odio amet iaculis auctor. Rutrum sit aliquam id ia',
        color: '#FF69B4', // Hot Pink
        image: card2
    },
    {
        id: 'uniswap',
        title: 'UNISWAP WORLD',
        description: 'Lorem ipsum dolor sit amet consectetur. Pulvinar egestas nec et egestas eu odio amet iaculis auctor. Rutrum sit aliquam id ia',
        color: '#00D1FF', // Cyan
        image: card3
    },
    {
        id: 'metamask',
        title: 'METAMASK WORLD',
        description: 'Lorem ipsum dolor sit amet consectetur. Pulvinar egestas nec et egestas eu odio amet iaculis auctor. Rutrum sit aliquam id ia',
        color: '#FF8800', // Orange
        image: card4
    },
    {
        id: 'link',
        title: 'LINK WORLD',
        description: 'Lorem ipsum dolor sit amet consectetur. Pulvinar egestas nec et egestas eu odio amet iaculis auctor. Rutrum sit aliquam id ia',
        color: '#00A3FF', // Light Blue
        image: card5
    },
    {
        id: 'sushiswap',
        title: 'SUSHISWAP',
        description: 'Lorem ipsum dolor sit amet consectetur. Pulvinar egestas nec et egestas eu odio amet iaculis auctor. Rutrum sit aliquam id ia',
        color: '#00D1FF', // Cyan
        image: card6
    },
    {
        id: 'pepe',
        title: 'PEPE WORLD',
        description: 'Lorem ipsum dolor sit amet consectetur. Pulvinar egestas nec et egestas eu odio amet iaculis auctor. Rutrum sit aliquam id ia',
        color: '#3EF4C0', // Green
        image: card7
    },
    {
        id: 'doge',
        title: 'DOGE WORLD',
        description: 'Lorem ipsum dolor sit amet consectetur. Pulvinar egestas nec et egestas eu odio amet iaculis auctor. Rutrum sit aliquam id ia',
        color: '#FFBF00', // Gold/Orange
        image: card8
    },
    {
        id: 'yeti',
        title: 'YETI WORLD',
        description: 'Lorem ipsum dolor sit amet consectetur. Pulvinar egestas nec et egestas eu odio amet iaculis auctor. Rutrum sit aliquam id ia',
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
                <div className="nav-top">
                    <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>GEMEPAD.FUN</div>
                    <button className="btn-connect">CONNECT WALLET</button>
                </div>

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

            <footer className="footer explore-footer">
                <div className="footer__brand">GEMEPAD.FUN</div>

                <div className="footer__cols">
                    <div className="footer-col">
                        <div className="footer-heading">Sections</div>
                        <a href="#">Home</a>
                        <a href="#">How it Works</a>
                        <a href="#">Key Features</a>
                    </div>
                    <div className="footer-col">
                        <div className="footer-heading">Sections</div>
                        <a href="#">Platforms</a>
                        <a href="#">Subscription</a>
                        <a href="#">Testimonials</a>
                    </div>
                    <div className="footer-col">
                        <div className="footer-heading">Company</div>
                        <a href="#">About</a>
                        <a href="#">Careers</a>
                        <a href="#">Contact</a>
                    </div>
                </div>

                <div className="footer__bottom">
                    <div className="footer__copy">© 2010-2025 GamePadFun. All rights reserved</div>
                    <div className="footer__bottom-links">
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                        <a href="#">Cookies Settings</a>
                    </div>
                </div>
            </footer>

            <style jsx>{`
        .explore-page {
          min-height: 100vh;
          color: white;
          padding-bottom: 2rem;
        }
        .nav-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 1.5rem;
          max-width: 1600px;
          margin: 0 auto;
        }
        .btn-connect {
           background: linear-gradient(90deg, #A855F7 0%, #D946EF 100%);
           border: none;
           padding: 0.6rem 1.4rem;
           border-radius: 8px;
           color: white;
           font-weight: 700;
           cursor: pointer;
           font-family: inherit;
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

        /* Footer */
        .explore-footer {
            margin-top: 5rem;
            padding: 3rem 2rem;
            background: #0B0B15; /* Dark footer background */
            max-width: 100%;
        }
        .footer__brand {
            font-family: 'Press Start 2P', cursive;
            font-size: 1.5rem;
            margin-bottom: 2rem;
        }
        .footer__cols {
            display: flex;
            justify-content: flex-end; /* Push links to right maybe? Or standard grid */
            gap: 4rem;
            margin-bottom: 3rem;
            border-bottom: 1px solid rgba(255,255,255,0.1);
            padding-bottom: 2rem;
        }
        /* Actually header design has links on right, so let's space them out */
        .footer__cols {
             display: flex;
             justify-content: flex-end; /* Align right as per visual roughly, or spread */
             flex-wrap: wrap; 
        }
        /* Let's try to match the image footer better. It has brand on left, cols on right. */
        .explore-footer {
             display: grid;
             grid-template-columns: 1fr 2fr;
             gap: 2rem;
        }
        .footer__brand {
             grid-column: 1;
        }
        .footer__cols {
             grid-column: 2;
             display: flex;
             justify-content: space-between;
             border-bottom: none;
             padding-bottom: 0;
             margin-bottom: 0;
        }
        .footer-col {
            display: flex;
            flex-direction: column;
            gap: 0.8rem;
        }
        .footer-heading {
             font-weight: 700;
             margin-bottom: 0.5rem;
             color: white;
        }
        .footer-col a {
             color: #888;
             text-decoration: none;
             font-size: 0.9rem;
        }
        .footer-col a:hover { color: white; }

        .footer__bottom {
             grid-column: 1 / -1;
             display: flex;
             justify-content: space-between;
             margin-top: 3rem;
             padding-top: 1.5rem;
             border-top: 1px solid rgba(255,255,255,0.05);
             font-size: 0.8rem;
             color: #666;
        }
        .footer__bottom-links {
             display: flex;
             gap: 2rem;
        }
        .footer__bottom-links a {
             color: #666;
             text-decoration: none;
        }
        
        .footer__brand + .brand-desc {
            color: #888;
            font-size: 0.85rem;
            line-height: 1.6;
            max-width: 300px;
            margin-top: -1.5rem;
            margin-bottom: 2rem;
            display: block;
        }
        
        /* Adjust footer layout to have description under logo */
         .explore-footer {
             grid-template-areas: 
               "brand links"
               "bottom bottom";
        }
        .footer__brand { grid-area: brand; }
        .footer__cols { grid-area: links; }
        .footer__bottom { grid-area: bottom; }

        @media (max-width: 768px) {
           .explore-footer {
               grid-template-columns: 1fr;
               grid-template-areas: 
                "brand"
                "links"
                "bottom";
               text-align: center;
               padding: 2rem;
           }
           .footer__cols {
               flex-direction: column;
               align-items: center;
               gap: 2rem;
               margin-top: 2rem;
           }
           .explore-title { font-size: 2.5rem; }
           .worlds-grid { grid-template-columns: 1fr; }
           .footer__bottom { flex-direction: column; gap: 1rem; align-items: center; }
        }

        @media (max-width: 1100px) {
           .worlds-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
      `}</style>

            {/* Brand description injection for footer left side */}
            <style jsx>{`
        .footer__brand::after {
            content: 'Lorem ipsum dolor sit amet consectetur. Neque dolor non amet ullamcorper nullam nunc in diam. In eu quis in ultrices ullamcorper';
            display: block;
            font-family: 'Inter', sans-serif;
            font-size: 0.8rem;
            color: #888;
            font-weight: 400;
            margin-top: 1rem;
            line-height: 1.6;
            max-width: 300px;
            text-transform: none;
        }
      `}</style>

        </div>
    )
}
