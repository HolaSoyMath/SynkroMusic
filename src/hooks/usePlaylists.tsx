'use client'
import { useEffect } from 'react'
import { useSpotifyApi } from '@/app/api/apiSpotify'
import { useContext } from 'react'
import { HomeContext } from '@/context/HomeContext'
import PlaylistInfosInterface from '@/interface/PlaylistInfos'
import { getLocalStorage } from '@/utils/getLocalStorage'

export function usePlaylists(token: string | null) {
  const api = useSpotifyApi()
  const { setIsLoading, setUserPlaylists, setBackgroundImage } =
    useContext(HomeContext)

    console.log('TOKEN DO HOOKS', token)

  useEffect(() => {
    if (!token) return
    setIsLoading(true)
    console.log('Entrou no use effect')
    console.log(
      'Toke local storage do spotify',
      getLocalStorage('spotifyAccessToken'),
    )

    async function load() {
      try {
        const userId = await api.get('/me')
        console.log('RESPOSTA DO USER ID BEM INTERESSANTE DE VDD MESMO', userId)

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
