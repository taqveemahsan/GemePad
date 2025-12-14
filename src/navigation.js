import { useEffect, useState } from 'react'

const NAVIGATE_EVENT = 'app:navigate'

let navigationState = null
const isDev = import.meta?.env?.DEV

export function navigate(to, state) {
  if (typeof window === 'undefined') return
  if (!to) return
  navigationState = state || null

  // Check if we're already at this URL (including query params)
  const currentUrl = window.location.pathname + window.location.search
  if (currentUrl === to) return

  if (isDev) console.log('🧭 Navigating to:', to)
  window.history.pushState({}, '', to)
  window.dispatchEvent(new Event(NAVIGATE_EVENT))
}

export function getNavigationState() {
  return navigationState
}

export function usePathname() {
  const [pathname, setPathname] = useState(() =>
    typeof window === 'undefined' ? '/' : window.location.pathname
  )

  useEffect(() => {
    const sync = () => setPathname(window.location.pathname)
    window.addEventListener('popstate', sync)
    window.addEventListener(NAVIGATE_EVENT, sync)
    return () => {
      window.removeEventListener('popstate', sync)
      window.removeEventListener(NAVIGATE_EVENT, sync)
    }
  }, [])

  return pathname
}
