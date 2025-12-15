export function isTelegramMiniApp() {
  try {
    const w = window
    const tg = w?.Telegram?.WebApp
    const qs = new URLSearchParams(w.location.search)
    const hasTgParams = Array.from(qs.keys()).some((key) => key.toLowerCase().startsWith('tgwebapp'))
    const hasTgHash = /tgwebapp/i.test(w.location.hash)
    const hasInitData = typeof tg?.initData === 'string' && tg.initData.length > 0
    const hasUnsafeData =
      tg?.initDataUnsafe && typeof tg.initDataUnsafe === 'object' && Object.keys(tg.initDataUnsafe).length > 0
    return Boolean(hasTgParams || hasTgHash || hasInitData || hasUnsafeData)
  } catch {
    return false
  }
}

export function openTelegramLink(url) {
  try {
    const tg = window?.Telegram?.WebApp
    if (tg?.openTelegramLink) {
      tg.openTelegramLink(url)
      return
    }
  } catch {
    // ignore
  }
  window.location.href = url
}

