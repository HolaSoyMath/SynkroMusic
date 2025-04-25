'use client'

import ImageSelectedMusic from '../imageSelectedMusic'
import ItemMusic from '../music/itemMusic'
import PlaylistCarousel from '../playlist/playlistCarousel'
import PlaylistInfo from '../playlist/playlistInfo'
import VinylCover from '../playlist/vinylCover'
import PlayInstrument from '../music/playInstrument'
import { useState } from 'react'
import LogoutButton from '../logoutButton'
import PlaylistInfosInterface from '@/interface/PlaylistInfos'
import { msToHourAndMinute } from '@/utils/msToHourAndMinute'

export default function HomeTemplate() {
  const [selectedMusics, setSelectedMusics] = useState<string[]>([])
  const [lastSelectedMusic, setLastSelectedMusic] = useState('')
  const [userPlaylist, setUserPlaylist] =
    useState<PlaylistInfosInterface | null>(null)
  const [backgroundImage, setBackgroundImage] = useState('')

  return (
    <div className="w-full h-full flex">
      <section className="h-full w-1/2 bg-foreground text-background">
        <div className="h-1/2 bg-background flex justify-center items-center">
          <VinylCover
            image={backgroundImage ? backgroundImage : '/loading.svg'}
          />
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
            <PlaylistCarousel
              setUserPlaylist={setUserPlaylist}
              setBackgroundImage={setBackgroundImage}
            />
          </div>
        </div>
      </section>
      <section className="relative h-full w-1/2 overflow-hidden">
        <ImageSelectedMusic
          image={backgroundImage ? backgroundImage : '/loading.svg'}
          className="blur-xl object-cover"
        />
        <div className="absolute inset-0 flex flex-col bg-white/60">
          <div className="fixed right-2 top-2">
            <LogoutButton />
          </div>
          <div className="flex-none h-2/12 flex items-center px-15">
            <p className="text-3xl font-bold text-background">
              {lastSelectedMusic}
            </p>
          </div>

          <div className="overflow-y-scroll flex-1">
            {userPlaylist?.tracks && userPlaylist.tracks.map((track) => (
              <ItemMusic
                name={track.name}
                durationMs={track.duration_ms}
                musicId={track.id}
                image={track.image}
                artist={track.artist}
                downloaded={false}
                setSelectedMusic={setSelectedMusics}
                selectedMusics={selectedMusics}
                setLastSelectedMusic={setLastSelectedMusic}
                setBackgroundImage={setBackgroundImage}
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
