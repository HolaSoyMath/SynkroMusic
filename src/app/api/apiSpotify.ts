import axios from 'axios'
import { useSession } from 'next-auth/react'

export function useSpotifyApi() {
  const { data: session } = useSession()
  const accessToken = session?.token.access_token ?? ''

  return axios.create({
    baseURL: 'https://api.spotify.com/v1',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  })
}
