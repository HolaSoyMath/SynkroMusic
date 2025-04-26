// hooks/usePlaylists.ts
'use client'
import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useSpotifyApi } from '@/app/api/apiSpotify'
import { useContext } from 'react'
import { HomeContext } from '@/context/HomeContext'
import PlaylistInfosInterface from '@/interface/PlaylistInfos'

export function usePlaylists() {
  const { data: session } = useSession()
  const api = useSpotifyApi()
  const { setIsLoading, setUserPlaylists, setBackgroundImage } = useContext(HomeContext)

  useEffect(() => {
    if (!session) return
    setIsLoading(true)

    async function load() {
      try {
        const userId = session?.token.sub
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
  }, [session])
}
