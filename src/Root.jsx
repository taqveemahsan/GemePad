import React, { Suspense, lazy } from 'react'
import App from './App'
import { usePathname } from './navigation'

const GamePage = lazy(() => import('./pages/GamePage.jsx'))
const ExploreWorlds = lazy(() => import('./pages/ExploreWorlds.jsx'))
const WorldPage = lazy(() => import('./pages/WorldPage.jsx'))

function RouteFallback() {
  return <div style={{ padding: '2rem', color: '#fff' }}>Loading…</div>
}

export default function Root() {
  const pathname = usePathname()

  if (pathname === '/game' || pathname.startsWith('/game?')) {
    return (
      <Suspense fallback={<RouteFallback />}>
        <GamePage />
      </Suspense>
    )
  }

  if (pathname === '/explore') {
    return (
      <Suspense fallback={<RouteFallback />}>
        <ExploreWorlds />
      </Suspense>
    )
  }

  if (pathname.startsWith('/world/')) {
    return (
      <Suspense fallback={<RouteFallback />}>
        <WorldPage />
      </Suspense>
    )
  }

  return <App />
}
