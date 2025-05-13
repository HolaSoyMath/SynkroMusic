'use client'
import { useEffect } from 'react'
import { useSpotifyApi } from '@/app/api/apiSpotify'
import { useContext } from 'react'
import { HomeContext } from '@/context/HomeContext'
import PlaylistInfosInterface from '@/interface/PlaylistInfos'

export function usePlaylists(token: string | undefined) {
  const api = useSpotifyApi()
  const { setIsLoading, setUserPlaylists, setBackgroundImage } =
    useContext(HomeContext)

  useEffect(() => {
    if (!token) return
    setIsLoading(true)

    async function load() {
      try {
<<<<<<< HEAD
        const userId = await (await api.get('/me')).data.id
=======
        const respSpotify = (await api.get('/me')).data
        const userId = respSpotify.id
>>>>>>> c7437174e9bfe8db20f2471f6b9e1e65e400398d

        const { data } = await api.get(`/users/${userId}/playlists`)
        const playlists = await data.items.map(
          (item: {
            id: string
            images: { url: string }[]
            name: string
            tracks: { href: string; total: number }
          }): PlaylistInfosInterface => ({
            id: item.id,
            image: item.images[0].url,
            name: item.name,
            quantity: item.tracks.total,
          }),
        )
        setUserPlaylists(playlists)

        const first = playlists[0]
        setBackgroundImage(first.image)
      } catch (err) {
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    load()
  }, [token])
}
