'use client'

import ImageSelectedMusic from '../imageSelectedMusic'
import ItemMusic from '../music/itemMusic'
import PlaylistCarousel from '../playlist/playlistCarousel'
import PlaylistInfo from '../playlist/playlistInfo'
import VinylCover from '../playlist/vinylCover'
import PlayInstrument from '../music/playInstrument'
import { useContext, useEffect } from 'react'
import LogoutButton from '../logoutButton'

import { msToHourAndMinute } from '@/functions/msToHourAndMinute'
import { HomeContext } from '@/context/HomeContext'
import { SpotifyTrack } from '@/types/SpotifyTrack'
import { usePlaylists } from '@/hooks/usePlaylists'
import Cookies from 'js-cookie'

export default function HomeTemplate() {
  const { lastSelectedMusic, userPlaylist, currentTime, setCurrentTime } =
    useContext(HomeContext)
  const spotifyToken = Cookies.get('spotifyAccessToken')
  usePlaylists(spotifyToken)

  useEffect(() => {
    if (!spotifyToken) {
      window.location.replace('/home')
    }
  }, [spotifyToken])

  return (
    <div className="w-full h-full flex">
      {/* Lado esquerdo */}
      <section className="h-full w-1/2 bg-foreground text-background">
        <div className="h-1/2 bg-background flex justify-center items-center">
          <VinylCover />
        </div>
        <div className="h-1/2 pt-7 flex flex-col">
          <PlaylistInfo
            name={userPlaylist?.name || ''}
            quantity={userPlaylist?.quantity || 0}
            time={
              userPlaylist
                ? msToHourAndMinute(userPlaylist.duration_ms ?? 0)
                : '00h00m'
            }
          />
          <div className="w-full h-7/12 pl-10 flex flex-col justify-end pb-3">
            <p className="uppercase tracking-[.08em] mb-5 text-background text-xs sm:mb-1 2xl:mb-4">
              Outras playlists
            </p>
            <PlaylistCarousel />
          </div>
        </div>
      </section>

      {/* Lado direito */}
      <section className="relative h-full w-1/2 overflow-hidden">
        <ImageSelectedMusic className="blur-xl object-cover" />
        <div className="absolute inset-0 flex flex-col bg-white/60">
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
            {userPlaylist?.tracks?.map((track: SpotifyTrack) => (
              <ItemMusic
                key={track.id}
                name={track.name}
                durationMs={track.duration_ms}
                musicId={track.id}
                image={track.image}
                artist={track.artist}
                downloaded={track.downloaded || false}
              />
            ))}  
          </div>

          <div className="flex-none h-1.5/12 bg-white/30">
            {lastSelectedMusic.linkVocal && (
              <PlayInstrument
                name="Vocal"
                linkSong={lastSelectedMusic.linkVocal || ""}
                sharedTime={currentTime}
                onTimeUpdate={setCurrentTime}
              />
            )}
            {lastSelectedMusic.linkInstruments && (
              <PlayInstrument
                name="Instrumentos"
                linkSong={lastSelectedMusic.linkInstruments || ""}
                sharedTime={currentTime}
                onTimeUpdate={setCurrentTime}
              />
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
