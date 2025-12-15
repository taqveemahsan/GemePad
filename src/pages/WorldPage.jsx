import { getWorldById } from '../data/worldsData'
import WorldLayout from '../components/WorldLayout'

export default function WorldPage() {
  // Get world slug from URL
  const slug =
    typeof window === 'undefined'
      ? ''
      : window.location.pathname.replace(/^\/world\/+/, '').split('/')[0]

  // Get world data
  const worldData = getWorldById(slug)

  // If world not found, show error
  if (!worldData) {
    return (
      <div className="page" style={{ padding: '2rem', color: 'white', textAlign: 'center' }}>
        <h2 style={{ margin: 0, fontFamily: "'Press Start 2P', cursive" }}>World not found</h2>
        <p style={{ opacity: 0.8, marginTop: '1.5rem' }}>Unknown world: {slug}</p>
        <a href="/explore" style={{ color: '#c61ae7', marginTop: '1rem', display: 'inline-block' }}>
          ← Back to Explore
        </a>
      </div>
    )
  }

  // Render world using shared layout
  return (
    <WorldLayout
      worldId={worldData.id}
      worldTitle={worldData.title}
      worldDescription={worldData.description}
      worldCtaText={worldData.ctaText}
      heroImage={worldData.heroImage}
      games={worldData.games}
      theme={worldData.theme}
      accentColor={worldData.accentColor}
    />
  )
}
