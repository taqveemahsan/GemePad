import React from 'react'
import App from './App'
import { usePathname } from './navigation'
import GamePage from './pages/GamePage.jsx'
import ExploreWorlds from './pages/ExploreWorlds.jsx'

export default function Root() {
  const pathname = usePathname()

  console.log('🔀 Current pathname:', pathname)

  if (pathname === '/game' || pathname.startsWith('/game?')) {
    console.log('✅ Rendering GamePage')
    return <GamePage />
  }

  if (pathname === '/explore') {
    return <ExploreWorlds />
  }

  console.log('✅ Rendering App (Homepage)')
  return <App />
}
