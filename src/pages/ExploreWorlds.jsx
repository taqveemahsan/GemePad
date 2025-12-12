import React from 'react'
import { navigate } from '../navigation'
import heroBot from '../assets/herosection/Gemini_Generated_Image_k7u1zrk7u1zrk7u1 1.png'
import bg01 from '../assets/herosection/Bg01.png'

// Reusing assets from App.jsx where appropriate or placeholders
// Ideally we would import specific assets for each world if available, 
// but for now I'll use the ones seen in App.jsx or placeholders to match the structure.

const worldsData = [
    {
        id: 'pepe',
        title: 'PEPE GAMES',
        description: 'Lorem ipsum dolor sit amet consectetur. Pulvinar egestas nec et egestas eu odio amet iaculis auctor. Rutrum sit aliquam id ia',
        color: '#3EF4C0', // Green
        images: {
            // Using placeholders or reusing existing assets for demo
            // In a real scenario, we'd have specific assets for "Pepe World Card"
            hero: 'https://placehold.co/400x200/1a1a2e/3EF4C0?text=Pepe+World',
        }
    },
    {
        id: 'doge',
        title: 'DOGE GAMES',
        description: 'Lorem ipsum dolor sit amet consectetur. Pulvinar egestas nec et egestas eu odio amet iaculis auctor. Rutrum sit aliquam id ia',
        color: '#FFBF00', // Orange/Gold
        images: {
            hero: 'https://placehold.co/400x200/1a1a2e/FFBF00?text=Doge+World',
        }
    },
    {
        id: 'yeti',
        title: 'YETI GAMES',
        description: 'Lorem ipsum dolor sit amet consectetur. Pulvinar egestas nec et egestas eu odio amet iaculis auctor. Rutrum sit aliquam id ia',
        color: '#66E0FF', // Cyan
        images: {
            hero: 'https://placehold.co/400x200/1a1a2e/66E0FF?text=Yeti+World',
        }
    },
    {
        id: 'pancake',
        title: 'PANCAKE GAMES',
        description: 'Lorem ipsum dolor sit amet consectetur. Pulvinar egestas nec et egestas eu odio amet iaculis auctor. Rutrum sit aliquam id ia',
        color: '#3EF4C0', // Cyan/Blueish - reusing green for now as per image logic roughly
        images: {
            hero: 'https://placehold.co/400x200/1a1a2e/3EF4C0?text=Pancake+World',
        }
    },
    {
        id: 'doge2',
        title: 'DOGE GAMES',
        description: 'Lorem ipsum dolor sit amet consectetur. Pulvinar egestas nec et egestas eu odio amet iaculis auctor. Rutrum sit aliquam id ia',
        color: '#FFBF00',
        images: {
            hero: 'https://placehold.co/400x200/1a1a2e/FFBF00?text=Doge+World',
        }
    },
    {
        id: 'yeti2',
        title: 'YETI GAMES',
        description: 'Lorem ipsum dolor sit amet consectetur. Pulvinar egestas nec et egestas eu odio amet iaculis auctor. Rutrum sit aliquam id ia',
        color: '#66E0FF',
        images: {
            hero: 'https://placehold.co/400x200/1a1a2e/66E0FF?text=Yeti+World',
        }
    },
    {
        id: 'pepe2',
        title: 'PEPE GAMES',
        description: 'Lorem ipsum dolor sit amet consectetur. Pulvinar egestas nec et egestas eu odio amet iaculis auctor. Rutrum sit aliquam id ia',
        color: '#3EF4C0',
        images: {
            hero: 'https://placehold.co/400x200/1a1a2e/3EF4C0?text=Pepe+World',
        }
    },
    {
        id: 'doge3',
        title: 'DOGE GAMES',
        description: 'Lorem ipsum dolor sit amet consectetur. Pulvinar egestas nec et egestas eu odio amet iaculis auctor. Rutrum sit aliquam id ia',
        color: '#FFBF00',
        images: {
            hero: 'https://placehold.co/400x200/1a1a2e/FFBF00?text=Doge+World',
        }
    },
]

function WorldCard({ world }) {
    return (
        <div
            className="world-card"
            style={{
                border: `2px solid ${world.color}`,
                /* Intense neon glow matching the design */
                boxShadow: `
            0 0 15px ${world.color}60, 
            inset 0 0 30px ${world.color}30,
            0 0 50px ${world.color}20
        `
            }}
        >
            <div className="world-card__content">
                <h3 style={{
                    color: world.color,
                    textShadow: `0 0 15px ${world.color}, 0 0 30px ${world.color}`
                }}>{world.title}</h3>
                <p>{world.description}</p>
                <div className="world-card__image-container">
                    {/* Placeholder or actual image */}
                    <div className="world-card__img-placeholder" style={{ borderColor: world.color }}>
                        {/* <img src={world.images.hero} alt={world.title} /> */}
                        {/* Using a visual structure similar to the design - usually a group of characters */}
                        <div className="character-group">
                            <div className="char char-1" style={{
                                background: `linear-gradient(135deg, ${world.color}, ${world.color}44)`,
                                boxShadow: `0 0 20px ${world.color}60`
                            }}></div>
                            <div className="char char-2" style={{
                                background: `linear-gradient(135deg, ${world.color}, ${world.color}66)`,
                                boxShadow: `0 0 20px ${world.color}60`,
                                zIndex: 2,
                                transform: 'scale(1.1)'
                            }}></div>
                            <div className="char char-3" style={{
                                background: `linear-gradient(135deg, ${world.color}, ${world.color}44)`,
                                boxShadow: `0 0 20px ${world.color}60`
                            }}></div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Corner decorations if needed, using CSS mainly */}
        </div>
    )
}

export default function ExploreWorlds() {
    return (
        <div className="page explore-page">
            <div className="page__bg-container">
                <img src={bg01} alt="" className="page__main-bg" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: -1 }} />
                {/* Overlay to darken it a bit for the neon to pop but keep BG visible */}
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(5, 5, 12, 0.65)', zIndex: -1 }}></div>
            </div>

            <header className="explore-hero">
                <div className="nav-top">
                    <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>GEMEPAD.FUN</div>
                    <button className="btn-connect">CONNECT WALLET</button>
                </div>

                <div className="explore-hero__content">
                    <h1 className="explore-title">
                        <span className="text-white">GEME</span> <span className="text-purple">WORLD</span>
                    </h1>
                    {/* The big character composition image would go here as a background or img */}
                    <div className="explore-hero__characters">
                        <img src={heroBot} alt="Characters" className="hero-bot-img" />
                    </div>
                </div>
            </header>

            <div className="explore-controls">
                <div className="search-bar">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    <input type="text" placeholder="Search Worlds..." />
                </div>
                <div className="filter-dropdown">
                    <span>Popular</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
                </div>
            </div>

            <div className="worlds-grid">
                {worldsData.map((world, idx) => (
                    <WorldCard key={idx} world={world} />
                ))}
            </div>

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

            <style jsx>{`
        .explore-page {
          min-height: 100vh;
          color: white;
          padding-bottom: 4rem;
        }
        .nav-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 3rem;
        }
        .explore-hero {
          position: relative;
          text-align: center;
          padding-top: 2rem;
          margin-bottom: 3rem;
        }
        .explore-title {
          font-family: 'Press Start 2P', cursive;
          font-size: 3rem;
          text-transform: uppercase;
          margin-bottom: 1rem;
          line-height: 1.2;
          position: relative;
          z-index: 2;
          /* Stronger Text Shadow */
          text-shadow: 
             0 0 10px rgba(139, 92, 246, 0.8),
             0 0 20px rgba(139, 92, 246, 0.6),
             0 0 40px rgba(139, 92, 246, 0.4);
        }
        .text-purple { 
            color: #C084FC; /* Lighter purple for better contrast */
        }
        .text-white { 
            color: #ffffff;
            text-shadow: 0 0 10px rgba(255,255,255,0.5);
        }
        
        .explore-hero__characters {
           height: 300px;
           overflow: hidden;
           margin-top: -50px;
           display: flex;
           justify-content: center;
           position: relative;
           z-index: 1;
        }
        .hero-bot-img {
           height: 100%;
           object-fit: contain;
           /* Brighter drop shadow */
           filter: drop-shadow(0 0 30px rgba(168, 85, 247, 0.6));
        }

        .explore-controls {
           max-width: 1200px;
           margin: 0 auto 3rem;
           padding: 0 1.5rem;
           display: flex;
           gap: 1rem;
        }
        .search-bar {
           flex: 1;
           background: rgba(255, 255, 255, 0.05);
           border: 1px solid rgba(255, 255, 255, 0.15);
           border-radius: 8px;
           display: flex;
           align-items: center;
           padding: 0 1rem;
           height: 48px;
           transition: border-color 0.3s, box-shadow 0.3s;
        }
        .search-bar:focus-within {
            border-color: #A855F7;
            box-shadow: 0 0 15px rgba(168, 85, 247, 0.2);
            background: rgba(255, 255, 255, 0.1);
        }
        .search-bar input {
           background: transparent;
           border: none;
           color: white;
           font-size: 1rem;
           width: 100%;
           margin-left: 0.5rem;
           outline: none;
        }
        .search-bar input::placeholder {
           color: rgba(255, 255, 255, 0.5);
        }
        .filter-dropdown {
           background: rgba(255, 255, 255, 0.05);
           border: 1px solid rgba(255, 255, 255, 0.15);
           border-radius: 8px;
           padding: 0 1.5rem;
           height: 48px;
           display: flex;
           align-items: center;
           gap: 0.5rem;
           cursor: pointer;
           transition: all 0.3s;
        }
        .filter-dropdown:hover {
           background: rgba(255, 255, 255, 0.1);
           border-color: rgba(255, 255, 255, 0.3);
        }

        .worlds-grid {
           display: grid;
           grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
           gap: 2.5rem; /* More breathing room */
           max-width: 1200px;
           margin: 0 auto;
           padding: 0 1.5rem;
        }

        .world-card {
           /* More transparent background to let neons pop */
           background: rgba(13, 13, 27, 0.6); 
           backdrop-filter: blur(10px);
           border-radius: 20px 4px 20px 4px;
           padding: 2.5rem 2rem;
           transition: all 0.3s ease-out;
           position: relative;
           overflow: hidden;
           min-height: 380px; /* Taller */
           display: flex;
           flex-direction: column;
        }
        .world-card:hover {
           transform: translateY(-8px) scale(1.02);
           background: rgba(13, 13, 27, 0.8); 
        }
        .world-card h3 {
           font-family: 'Press Start 2P', cursive;
           font-size: 1.4rem;
           margin-bottom: 1.2rem;
           text-transform: uppercase;
           letter-spacing: 1px;
           line-height: 1.4;
           /* Text shadow set inline dynamically but can be reinforced here */
        }
        .world-card p {
           color: rgba(255, 255, 255, 0.8); /* Brighter text */
           font-size: 0.95rem;
           line-height: 1.6;
           margin-bottom: 2rem;
        }
        .world-card__image-container {
           margin-top: auto;
           position: relative;
           padding-top: 1rem;
        }
        .character-group {
           display: flex;
           justify-content: center;
           height: 140px; /* Larger */
           position: relative;
        }
        .char {
           width: 100px;
           height: 100px;
           border-radius: 50%;
           margin: 0 -15px;
           box-shadow: 0 0 15px rgba(0,0,0,0.5); /* Separate circles visually */
           border: 1px solid rgba(255,255,255,0.1);
        }
        .footer {
            margin-top: 4rem;
            padding: 3rem 1.5rem;
            border-top: 1px solid rgba(255,255,255,0.1);
            display: flex;
            justify-content: space-between;
            align-items: center;
            max-width: 1200px;
            margin-left: auto;
            margin-right: auto;
        }
        .footer__links {
           display: flex;
           gap: 2rem;
        }
        .footer__links a {
           color: #888;
           text-decoration: none;
        }
        .footer__copy {
           color: #555;
        }
      `}</style>
        </div>
    )
}
