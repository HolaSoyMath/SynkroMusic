import { getLocalStorage } from '@/functions/getLocalStorage'
import axios from 'axios'

export function apiSpotify() {
  let accessToken
  try {
    accessToken = getLocalStorage('spotifyAccessToken')
  } catch (error) {
    accessToken = ''
  }

  return axios.create({
    baseURL: 'https://api.spotify.com/v1',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  })
}
