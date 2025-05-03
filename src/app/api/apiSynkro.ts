import axios from 'axios'

export function apiSynkro() {
  let accessToken
  try {
    accessToken = window.localStorage.getItem('spotifyAccessToken')
  } catch (error) {
    accessToken = ''
  }

  return axios.create({
    baseURL: 'https://music-api-integration.onrender.com/api',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  })
}
