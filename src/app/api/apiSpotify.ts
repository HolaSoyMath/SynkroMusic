import { getLocalStorage } from '@/utils/getLocalStorage'
import axios from 'axios'

export function useSpotifyApi() {
  const accessToken = getLocalStorage('spotifyAccessToken')

  return axios.create({
    baseURL: 'https://api.spotify.com/v1',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  })
}
