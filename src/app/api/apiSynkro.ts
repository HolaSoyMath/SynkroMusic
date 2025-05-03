import axios from 'axios'

export function useSynkroApi() {
  const accessToken = window.localStorage.getItem('spotifyAccessToken')

  return axios.create({
    baseURL: 'https://music-api-integration.onrender.com/api',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  })
}
