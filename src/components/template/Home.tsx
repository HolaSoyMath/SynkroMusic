'use client'

import ImageSelectedMusic from '../imageSelectedMusic'
import ItemMusic from '../music/itemMusic'
import PlaylistCarousel from '../playlist/playlistCarousel'
import PlaylistInfo from '../playlist/playlistInfo'
import VinylCover from '../playlist/vinylCover'
import PlayInstrument from '../music/playInstrument'
import { useContext, useEffect, useState } from 'react'
import LogoutButton from '../logoutButton'
import { msToHourAndMinute } from '@/utils/msToHourAndMinute'
import { HomeContext } from '@/context/HomeContext'
import { SpotifyTrack } from '@/interface/SpotifyTrack'
import LoadingPulseLogo from './loadingPlaylist/LoadingPulseLogo'
import { usePlaylists } from '@/hooks/usePlaylists'
import { useSynkroApi } from '@/app/api/apiSynkro'
import { useSearchParams } from 'next/navigation'
import { saveLocalStorage } from '@/utils/saveLocalStorage'

export default function HomeTemplate() {
  const [spotifyToken, setSpotifyToken] = useState<string | null>(null)
  const { lastSelectedMusic, userPlaylist, isLoading } = useContext(HomeContext)
  const sessionId = useSearchParams().get('sessionId')
  const api = useSynkroApi()

  useEffect(() => {
    async function getTokens() {
      const resp = await api.get('/auth/get-token-by-cache', {
        params: { sessionId: sessionId },
      })
      await saveLocalStorage(
        'spotifyAccessToken',
        resp.data.spotifyTokenInfo.accessToken,
      )
      await saveLocalStorage(
        'spotifyRefreshToken',
        resp.data.spotifyTokenInfo.refreshToken,
      )
      await saveLocalStorage(
        'spotifyExpiresAccessToken',
        Date.now() + resp.data.spotifyTokenInfo.expiresIn,
      )

      await saveLocalStorage(
        'internalAccessToken',
        resp.data.internalTokenInfo.accessToken,
      )
      await saveLocalStorage(
        'internalExpiresAccessToken',
        Date.now() + resp.data.internalTokenInfo.expiresIn,
      )

      setSpotifyToken(resp.data.spotifyTokenInfo.accessToken)

      return
    }
    getTokens()
  }, [])

  usePlaylists(spotifyToken)

  if (isLoading) {
    return <LoadingPulseLogo />
  } else {
    return (
      <div className="w-full h-full flex">
        <section className="h-full w-1/2 bg-foreground text-background">
          <div className="h-1/2 bg-background flex justify-center items-center">
            <VinylCover />
          </div>
          <div className="h-1/2 pt-7 flex flex-col">
            <PlaylistInfo
              name={userPlaylist ? userPlaylist.name : ''}
              quantity={userPlaylist ? userPlaylist.quantity : 0}
              time={
                userPlaylist
                  ? msToHourAndMinute(userPlaylist.duration_ms ?? 0)
                  : '00h00m'
              }
            />
            <div className=" w-full h-7/12 pl-10 flex flex-col justify-end pb-3">
              <p className="uppercase tracking-[.08em] mb-5 text-background text-xs sm:mb-1 2xl:mb-4">
                Outras playlists
              </p>
              <PlaylistCarousel />
            </div>
          </div>
        </section>
        <section className="relative h-full w-1/2 overflow-hidden">
          <ImageSelectedMusic className="blur-xl object-cover" />
          <div className="absolute inset-0 flex flex-col bg-white/60 ">
            <div className="fixed right-2 top-2">
              <LogoutButton />
            </div>
            <div className="h-2/12 flex flex-col px-15 justify-center">
              <p className="text-3xl font-bold text-background text-start line-clamp-2 mb-3">
                {lastSelectedMusic.music}
              </p>
              <p className="text-sm font-normal text-background/70">
                {lastSelectedMusic.artist}
              </p>
            </div>

            <div className="overflow-y-scroll flex-1">
              {userPlaylist?.tracks &&
                userPlaylist.tracks.map((track: SpotifyTrack) => (
                  <ItemMusic
                    name={track.name}
                    durationMs={track.duration_ms}
                    musicId={track.id}
                    image={track.image}
                    artist={track.artist}
                    downloaded={false}
                    key={track.id}
                  />
                ))}
            </div>

            <div className="flex-none h-1.5/12 bg-white/30">
              <PlayInstrument name="Vocal" />
              <PlayInstrument name="Instrumentos" />
            </div>
          </div>
        </section>
      </div>
    )
  }
}
