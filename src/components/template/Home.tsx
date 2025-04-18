'use client'

import { musicPLaylist } from "@/mock/MusicsOnPlaylistSpotify";
import ImageSelectedMusic from "../imageSelectedMusic";
import ItemMusic from "../music/itemMusic";
import PlaylistCarousel from "../playlist/playlistCarousel";
import PlaylistInfo from "../playlist/playlistInfo";
import VinylCover from "../playlist/vinylCover";
import PlayInstrument from "../music/playInstrument";
import { useState } from "react";
import LogoutButton from "../logoutButton";

export default function HomeTemplate() {
  const [selectedMusics, setSelectedMusics] = useState<string[]>([]);

  const tracks = musicPLaylist.tracks.items;

  return (
    <div className="w-full h-full flex">
      <section className="h-full w-1/2 bg-foreground text-background">
        <div className="h-1/2 bg-background flex justify-center items-center">
          <VinylCover />
        </div>
        <div className="h-1/2 pt-7 flex flex-col ">
          <PlaylistInfo name="Playlist 14" quantity={15} time="1h30m" />
          <div className=" w-full h-7/12 pl-10 flex flex-col justify-end pb-3">
            <p className="uppercase text-xs tracking-[.08em] mb-5 text-background">
              Outras playlists
            </p>
            <PlaylistCarousel />
          </div>
        </div>
      </section>
      <section className="relative h-full w-1/2 overflow-hidden">
        <ImageSelectedMusic className="blur-xl object-cover" />
        <div className="absolute inset-0 flex flex-col bg-white/60">
            <div className="fixed right-2 top-2">
              <LogoutButton />
            </div>
          <div className="flex-none h-2/12 flex items-center px-15">
            <p className="text-3xl font-bold text-background">What I’ve Done</p>
          </div>

          <div className="flex-1 overflow-y-scroll">
            {tracks.map((track) => (
              <ItemMusic
                name={track.track.name}
                durationMs={track.track.duration_ms}
                musicId={track.track.id}
                setSelectedMusic={setSelectedMusics}
                selectedMusics={selectedMusics}
                key={track.track.id}
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
  );
}
