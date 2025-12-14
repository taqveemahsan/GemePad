import { useState, useEffect } from 'react'
import { getPublishedGames } from '../api/games'

const isDev = import.meta?.env?.DEV

export function useGames({ category = 'play-to-earn', sortBy = 'desc', page = 1, limit = 12 } = {}) {
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchGames() {
      try {
        setLoading(true)
        setError(null)
        if (isDev) console.log('🎮 useGames: Fetching games from API...')

        const response = await getPublishedGames({
          category,
          sortBy,
          page,
          limit,
        })

        if (isDev) console.log('📦 useGames: API Response:', response)

        if (response && response.games) {
          if (isDev) console.log('✅ useGames: Games loaded:', response.games.length)
          setGames(response.games)
        } else {
          console.warn('⚠️ useGames: No games in response')
          setGames([])
        }
      } catch (err) {
        console.error('❌ useGames: Failed to fetch games:', err)
        setError(err)
        setGames([])
      } finally {
        setLoading(false)
      }
    }

    fetchGames()
  }, [category, sortBy, page, limit])

  return { games, loading, error }
}

export function useGameById(gameId) {
  const [game, setGame] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchGame() {
      if (!gameId) {
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError(null)
        if (isDev) console.log('🎮 useGameById: Fetching game:', gameId)

        // Fetch all games and find the specific one
        const response = await getPublishedGames({
          category: 'play-to-earn',
          sortBy: 'desc',
          page: 1,
          limit: 100, // Fetch more to increase chance of finding the game
        })

        if (response && response.games) {
          const foundGame = response.games.find(
            g => g.id === gameId || g.gameId === gameId
          )

          if (foundGame) {
            if (isDev) console.log('✅ useGameById: Game found:', foundGame.GameName)
            setGame(foundGame)
          } else {
            console.warn('⚠️ useGameById: Game not found')
            setError(new Error('Game not found'))
          }
        } else {
          console.warn('⚠️ useGameById: No games in response')
          setError(new Error('Failed to fetch games'))
        }
      } catch (err) {
        console.error('❌ useGameById: Failed to fetch game:', err)
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchGame()
  }, [gameId])

  return { game, loading, error }
}
