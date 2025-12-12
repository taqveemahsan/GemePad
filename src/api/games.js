const API_BASE_URL = 'https://engine-be.sonicengine.net'

export async function getPublishedGames({
  category = 'play-to-earn',
  sortBy = 'desc',
  page = 1,
  limit = 12,
} = {}) {
  try {
    const url = `${API_BASE_URL}/project/getPublishedGames?category=${category}&sortBy=${sortBy}&page=${page}&limit=${limit}`
    console.log('🌐 API Call:', url)

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
    })

    console.log('📡 Response Status:', response.status)

    if (!response.ok) {
      throw new Error(`Failed to fetch games: ${response.statusText}`)
    }

    const data = await response.json()
    console.log('📦 Response Data:', data)
    return data
  } catch (error) {
    console.error('❌ API Error:', error)
    throw error
  }
}
