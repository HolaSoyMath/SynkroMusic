import axios from 'axios'
import Cookies from 'js-cookie'

export function useSpotifyApi() {

  const accessToken = Cookies.get('spotifyAccessToken')

  return axios.create({
    baseURL: 'https://api.spotify.com/v1',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  })
}
