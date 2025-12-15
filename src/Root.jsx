import React, { Suspense, lazy } from 'react'
import App from './App'
import { usePathname } from './navigation'
import Footer from './components/Footer'

const GamePage = lazy(() => import('./pages/GamePage.jsx'))
const ExploreWorlds = lazy(() => import('./pages/ExploreWorlds.jsx'))
const WorldPage = lazy(() => import('./pages/WorldPage.jsx'))

function RouteFallback() {
  return <div style={{ padding: '2rem', color: '#fff' }}>Loading…</div>
}

export default function Root() {
  const pathname = usePathname()

  let content

  if (pathname === '/game' || pathname.startsWith('/game?')) {
    content = (
      <Suspense fallback={<RouteFallback />}>
        <GamePage />
      </Suspense>
    )
  } else if (pathname === '/explore') {
    content = (
      <Suspense fallback={<RouteFallback />}>
        <ExploreWorlds />
      </Suspense>
    )
  } else if (pathname.startsWith('/world/')) {
    content = (
      <Suspense fallback={<RouteFallback />}>
        <WorldPage />
      </Suspense>
    )
  } else {
    content = <App />
  }

  return (
    <>
      {content}
      <Footer />
    </>
  )
}
