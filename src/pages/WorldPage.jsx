import { getWorldById } from '../data/worldsData'
import WorldLayout from '../components/WorldLayout'
import { useGames } from '../hooks/useGames'

export default function WorldPage() {
  // Get world slug from URL
  const slug =
    typeof window === 'undefined'
      ? ''
      : window.location.pathname.replace(/^\/world\/+/, '').split('/')[0]

  // Get world data
  const worldData = getWorldById(slug)

  // Fetch dynamic games for General World
  const { games: dynamicGames, loading } = useGames({
    category: 'play-to-earn',
    sortBy: 'desc',
    page: 1,
    limit: 12,
  })

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

  // Use dynamic games if this is the General World, otherwise use static data
  const displayGames = slug === 'general' ? dynamicGames : worldData.games

  // Map dynamic games to match WorldLayout expectations if needed
  // The API returns games with GameName, GameThumbnail etc.
  // WorldLayout expects { id, title, img } or similar structure depending on WorldGameCard
  // But wait, WorldLayout uses:
  // <WorldGameCard game={game} ... />
  // And WorldGameCard (we need to check its props, but likely handles different formats or we need to normalize)
  
  // Let's normalize dynamic games to match static structure just in case
  const normalizedGames = (slug === 'general' && displayGames) 
    ? displayGames.map(game => ({
        id: game.id || game.gameId,
        title: game.GameName,
        img: game.GameThumbnail,
        playCount: game.playCount,
        ...game // keep other props
      }))
    : displayGames

  // Render world using shared layout
  return (
    <WorldLayout
      worldId={worldData.id}
      worldTitle={worldData.title}
      worldDescription={worldData.description}
      worldCtaText={worldData.ctaText}
      heroImage={worldData.heroImage}
      games={normalizedGames}
      loading={slug === 'general' ? loading : false}
      theme={worldData.theme}
      accentColor={worldData.accentColor}
    />
  )
}
