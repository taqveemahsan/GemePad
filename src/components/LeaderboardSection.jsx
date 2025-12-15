import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

const DEFAULT_API_BASE = 'https://engine-be.sonicengine.net'
const API_BASE = (import.meta.env?.VITE_API_BASE_URL || DEFAULT_API_BASE).replace(/\/$/, '')

const TOP_PLAYERS_TTL_MS = 2 * 60 * 1000
const ACTIVITY_TTL_MS = 30 * 1000

const memoryCache = {
  topPlayers: null,
  activityByKey: new Map(),
}

function getNow() {
  return Date.now()
}

function safeJsonParse(value) {
  try {
    return JSON.parse(value)
  } catch {
    return null
  }
}

function getSessionCache(key) {
  const raw = sessionStorage.getItem(key)
  if (!raw) return null
  const parsed = safeJsonParse(raw)
  if (!parsed || typeof parsed !== 'object') return null
  if (typeof parsed.ts !== 'number') return null
  return parsed
}

function setSessionCache(key, data) {
  try {
    sessionStorage.setItem(key, JSON.stringify({ ts: getNow(), data }))
  } catch {
    // ignore quota errors
  }
}

async function fetchJson(url, { signal }) {
  const response = await fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    signal,
  })
  if (!response.ok) throw new Error(`HTTP ${response.status}`)
  return response.json()
}

function shortWallet(walletAddress) {
  if (!walletAddress) return ''
  const s = String(walletAddress)
  if (s.length <= 14) return s
  return `${s.slice(0, 6)}...${s.slice(-4)}`
}

function formatDateTime(iso) {
  if (!iso) return ''
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return ''
  try {
    const datePart = new Intl.DateTimeFormat('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    }).format(date)
    const timePart = new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    }).format(date)
    return `${datePart} - ${timePart}`
  } catch {
    return date.toISOString()
  }
}

function formatMoney(value) {
  const number = typeof value === 'number' ? value : Number(value)
  if (!Number.isFinite(number)) return '0.00'
  return number.toFixed(2)
}

function buildPageButtons(currentPage, pageCount, maxButtons = 7) {
  if (pageCount <= maxButtons) return Array.from({ length: pageCount }, (_, i) => i + 1)

  const buttons = new Set([1, pageCount, currentPage])
  for (let i = 1; i <= 2; i += 1) {
    buttons.add(currentPage - i)
    buttons.add(currentPage + i)
  }

  const clamped = Array.from(buttons)
    .filter((p) => p >= 1 && p <= pageCount)
    .sort((a, b) => a - b)

  return clamped
}

const skeletonGradient = 'linear-gradient(90deg, rgba(26, 26, 46, 0.7) 25%, rgba(42, 42, 62, 0.7) 50%, rgba(26, 26, 46, 0.7) 75%)'

function TableSkeleton({ rows = 6 }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, idx) => (
        <tr key={idx} aria-hidden="true">
          <td>
            <div className="game-cell">
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 8,
                  background: skeletonGradient,
                  backgroundSize: '200% 100%',
                  animation: 'loading 1.5s ease-in-out infinite',
                }}
              />
              <div
                style={{
                  height: 14,
                  width: 140,
                  borderRadius: 4,
                  background: skeletonGradient,
                  backgroundSize: '200% 100%',
                  animation: 'loading 1.5s ease-in-out infinite',
                }}
              />
            </div>
          </td>
          {Array.from({ length: 5 }).map((__, c) => (
            <td key={c}>
              <div
                style={{
                  height: 14,
                  width: c === 3 ? 70 : 120,
                  borderRadius: 4,
                  background: skeletonGradient,
                  backgroundSize: '200% 100%',
                  animation: 'loading 1.5s ease-in-out infinite',
                }}
              />
            </td>
          ))}
        </tr>
      ))}
    </>
  )
}

function TopPlayersSkeleton({ count = 6 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className="top-player-item" aria-hidden="true">
          <div
            className="player-avatar"
            style={{
              background: skeletonGradient,
              backgroundSize: '200% 100%',
              animation: 'loading 1.5s ease-in-out infinite',
            }}
          />
          <div
            style={{
              height: 14,
              width: '70%',
              borderRadius: 4,
              background: skeletonGradient,
              backgroundSize: '200% 100%',
              animation: 'loading 1.5s ease-in-out infinite',
            }}
          />
        </div>
      ))}
    </>
  )
}

const avatarColors = ['#a855f7', '#8b5cf6', '#7c3aed', '#6366f1', '#ec4899', '#d946ef']

const LeaderboardSection = React.memo(function LeaderboardSection({ footerBg, gameIcons = [] }) {
  const [topPlayersState, setTopPlayersState] = useState({ status: 'loading', data: [], error: null })
  const [activityState, setActivityState] = useState({
    status: 'loading',
    data: [],
    error: null,
    pagination: { limit: 7, offset: 0, total: 0 },
  })

  const pageSize = activityState.pagination.limit
  const page = Math.floor(activityState.pagination.offset / pageSize) + 1
  const pageCount = Math.max(1, Math.ceil((activityState.pagination.total || 0) / pageSize))

  const activityAbortRef = useRef(null)
  const topPlayersAbortRef = useRef(null)

  const loadTopPlayers = useCallback(() => {
    const cacheKey = 'gd.leaderboard.topPlayers.v1'
    const now = getNow()

    if (memoryCache.topPlayers && now - memoryCache.topPlayers.ts < TOP_PLAYERS_TTL_MS) {
      setTopPlayersState({ status: 'loaded', data: memoryCache.topPlayers.data, error: null })
      return
    }

    const fromSession = getSessionCache(cacheKey)
    if (fromSession && now - fromSession.ts < TOP_PLAYERS_TTL_MS) {
      memoryCache.topPlayers = fromSession
      setTopPlayersState({ status: 'loaded', data: fromSession.data, error: null })
      return
    }

    if (topPlayersAbortRef.current) topPlayersAbortRef.current.abort()
    const controller = new AbortController()
    topPlayersAbortRef.current = controller

    setTopPlayersState((prev) => ({ ...prev, status: 'loading', error: null }))

    fetchJson(`${API_BASE}/public/leaderboard/top-players?topLimit=6`, { signal: controller.signal })
      .then((data) => {
        const list = Array.isArray(data?.topPlayers) ? data.topPlayers : []
        const payload = list.map((p) => ({
          walletAddress: p.walletAddress,
          totalRewardsUSD: p.totalRewardsUSD,
          wins: p.wins,
        }))
        memoryCache.topPlayers = { ts: getNow(), data: payload }
        setSessionCache(cacheKey, payload)
        setTopPlayersState({ status: 'loaded', data: payload, error: null })
      })
      .catch((error) => {
        if (controller.signal.aborted) return
        setTopPlayersState({ status: 'error', data: [], error: error?.message || 'Failed to load' })
      })
  }, [])

  const loadActivity = useCallback((nextPage) => {
    const limit = pageSize
    const offset = (nextPage - 1) * limit
    const cacheKey = `gd.leaderboard.activity.v1?limit=${limit}&offset=${offset}`
    const now = getNow()

    const memory = memoryCache.activityByKey.get(cacheKey)
    if (memory && now - memory.ts < ACTIVITY_TTL_MS) {
      setActivityState({ status: 'loaded', data: memory.data.entries, error: null, pagination: memory.data.pagination })
      return
    }

    const fromSession = getSessionCache(cacheKey)
    if (fromSession && now - fromSession.ts < ACTIVITY_TTL_MS) {
      memoryCache.activityByKey.set(cacheKey, fromSession)
      setActivityState({ status: 'loaded', data: fromSession.data.entries, error: null, pagination: fromSession.data.pagination })
      return
    }

    if (activityAbortRef.current) activityAbortRef.current.abort()
    const controller = new AbortController()
    activityAbortRef.current = controller

    setActivityState((prev) => ({
      ...prev,
      status: prev.data?.length ? 'updating' : 'loading',
      error: null,
      pagination: { ...prev.pagination, limit, offset },
    }))

    fetchJson(`${API_BASE}/public/leaderboard/activity?limit=${limit}&offset=${offset}`, { signal: controller.signal })
      .then((data) => {
        const entries = Array.isArray(data?.entries) ? data.entries : []
        const pagination = data?.pagination || { limit, offset, total: entries.length }
        const payload = { entries, pagination }
        memoryCache.activityByKey.set(cacheKey, { ts: getNow(), data: payload })
        setSessionCache(cacheKey, payload)
        setActivityState({ status: 'loaded', data: entries, error: null, pagination })
      })
      .catch((error) => {
        if (controller.signal.aborted) return
        setActivityState((prev) => ({
          ...prev,
          status: 'error',
          error: error?.message || 'Failed to load',
        }))
      })
  }, [pageSize])

  useEffect(() => {
    const t = window.setTimeout(() => {
      loadTopPlayers()
      loadActivity(1)
    }, 0)
    return () => {
      window.clearTimeout(t)
      if (activityAbortRef.current) activityAbortRef.current.abort()
      if (topPlayersAbortRef.current) topPlayersAbortRef.current.abort()
    }
  }, [loadActivity, loadTopPlayers])

  const activityRows = useMemo(() => {
    return (activityState.data || []).map((entry, idx) => {
      const icon = gameIcons.length ? gameIcons[idx % gameIcons.length] : null
      return {
        id: entry.id || `${entry.walletAddress}-${entry.submittedAt}-${idx}`,
        game: entry?.leaderboard?.name || entry?.game?.id || 'Game',
        gameIcon: icon,
        dateTime: formatDateTime(entry.submittedAt),
        wallet: entry.playerName || shortWallet(entry.walletAddress),
        score: entry.score,
        rewards: '0.00',
      }
    })
  }, [activityState.data, gameIcons])

  const pageButtons = useMemo(() => buildPageButtons(page, pageCount), [page, pageCount])

  const canPrev = page > 1 && activityState.status !== 'loading' && activityState.status !== 'updating'
  const canNext = page < pageCount && activityState.status !== 'loading' && activityState.status !== 'updating'

  return (
    <section className="leaderboard-section">
      <div className="leaderboard-header">
        <h2 className="leaderboard-title">
          LEADER<span className="text-purple">BOARD</span>
        </h2>
        <p className="leaderboard-description">
          Lorem ipsum dolor sit amet consectetur. Tellus magna habitant eleifend velit odio sem. Arcu neque nibh vitae eu et feugiat vel a nullam.
        </p>
      </div>

      <div
        className="leaderboard-container"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url("${footerBg}")`,
        }}
      >
        <div className="leaderboard-table-wrapper" style={{ position: 'relative' }}>
          {(activityState.status === 'updating') && (
            <div
              style={{
                position: 'absolute',
                top: 12,
                right: 16,
                padding: '6px 10px',
                borderRadius: 8,
                background: 'rgba(0,0,0,0.35)',
                color: 'rgba(255,255,255,0.75)',
                fontSize: 12,
                zIndex: 2,
              }}
            >
              Loading...
            </div>
          )}

          <table className="leaderboard-table" aria-busy={activityState.status === 'loading' || activityState.status === 'updating'}>
            <thead>
              <tr>
                <th>Game</th>
                <th>Date & Time</th>
                <th>Wallet Address</th>
                <th>Score</th>
                <th>Rewards</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {activityState.status === 'loading' ? (
                <TableSkeleton rows={7} />
              ) : activityState.status === 'error' ? (
                <tr>
                  <td colSpan={6} style={{ color: 'rgba(255,255,255,0.7)' }}>
                    Failed to load leaderboard.{' '}
                    <button
                      type="button"
                      className="pagination-btn"
                      onClick={() => loadActivity(page)}
                      style={{ marginLeft: 8 }}
                    >
                      Retry
                    </button>
                  </td>
                </tr>
              ) : (
                activityRows.map((row) => (
                  <tr key={row.id}>
                    <td>
                      <div className="game-cell">
                        {row.gameIcon ? <img src={row.gameIcon} alt={row.game} className="game-icon" /> : <div className="game-icon" />}
                        <span>{row.game}</span>
                      </div>
                    </td>
                    <td>{row.dateTime}</td>
                    <td>{row.wallet}</td>
                    <td>
                      <span className="score-badge">{row.score}</span>
                    </td>
                    <td>
                      <div className="rewards-cell">
                        <span className="reward-icon">$</span>
                        <span>{row.rewards}</span>
                      </div>
                    </td>
                    <td>
                      <button className="action-btn" type="button">
                        ⋯
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <div className="pagination">
            <button className="pagination-btn" type="button" disabled={!canPrev} onClick={() => loadActivity(page - 1)}>
              ‹
            </button>
            {pageButtons.map((p, idx) => {
              const prev = pageButtons[idx - 1]
              const showDots = prev && p - prev > 1
              return (
                <React.Fragment key={p}>
                  {showDots && <span className="pagination-dots">...</span>}
                  <button
                    className={`pagination-btn ${p === page ? 'active' : ''}`}
                    type="button"
                    disabled={activityState.status === 'loading' || activityState.status === 'updating'}
                    onClick={() => loadActivity(p)}
                  >
                    {p}
                  </button>
                </React.Fragment>
              )
            })}
            <button className="pagination-btn" type="button" disabled={!canNext} onClick={() => loadActivity(page + 1)}>
              ›
            </button>
            <span className="pagination-info">
              {Math.min(activityState.pagination.offset + pageSize, activityState.pagination.total || 0)} / {activityState.pagination.total || 0}
            </span>
          </div>
        </div>

        <div className="top-player-panel">
          <h3 className="top-player-title">
            TOP <span className="text-purple">PLAYER</span>
            <br />
            <span className="top-player-subtitle">OF ALL TIME</span>
          </h3>
          <div className="top-players-list" aria-busy={topPlayersState.status === 'loading'}>
            {topPlayersState.status === 'loading' ? (
              <TopPlayersSkeleton count={6} />
            ) : topPlayersState.status === 'error' ? (
              <div style={{ color: 'rgba(255,255,255,0.7)' }}>
                Failed to load top players.{' '}
                <button type="button" className="pagination-btn" onClick={loadTopPlayers} style={{ marginLeft: 8 }}>
                  Retry
                </button>
              </div>
            ) : (
              topPlayersState.data.map((player, idx) => {
                const label = shortWallet(player.walletAddress)
                const avatarText = label ? label.slice(0, 2).toUpperCase() : '??'
                return (
                  <div key={player.walletAddress || idx} className="top-player-item">
                    <div className="player-avatar" style={{ background: avatarColors[idx % avatarColors.length] }}>
                      {avatarText}
                    </div>
                    <span className="player-wallet">
                      {label} {player.totalRewardsUSD ? `— $${formatMoney(player.totalRewardsUSD)}` : ''}
                    </span>
                  </div>
                )
              })
            )}
          </div>
        </div>
      </div>
    </section>
  )
})

export default LeaderboardSection
