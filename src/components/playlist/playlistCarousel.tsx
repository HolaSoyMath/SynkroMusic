'use client'

import { Card, CardContent } from '../ui/card'
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel'
import Image from 'next/image'
import React, { useContext, useEffect } from 'react'
import { useSpotifyApi } from '@/app/api/apiSpotify'
import SkeletonPlaylistImage from '../skeleton/playlistImage'
import { Skeleton } from '../ui/skeleton'
import { sumMsDurationPlaylist } from '@/utils/sumMsDurationPlaylist'
import { SpotifyTrack } from '@/interface/SpotifyTrack'
import { HomeContext } from '@/context/HomeContext'
import PlaylistInfosInterface from '@/interface/PlaylistInfos'

export default function PlaylistCarousel() {
  const api = useSpotifyApi()
  const { setBackgroundImage, setUserPlaylist, isLoading, userPlaylists } =
    useContext(HomeContext)

  async function selectedPlaylist(id: string, image: string, name: string) {
    const { data } = await api.get(`/playlists/${id}/tracks`)

    // @ts-expect-error - O "item" nao tem uma interface criada, por isso apresentará um erro, mas está ok
    const listTracks: SpotifyTrack[] = data.items.map((item) => {
      return {
        id: item.track.id,
        name: item.track.name,
        artist: item.track.album.artists[0].name,
        duration_ms: item.track.duration_ms,
        image: item.track.album.images[0].url,
      }
    })

    const totalDurationMs = sumMsDurationPlaylist(listTracks)
    const quantity = data.total

    setUserPlaylist({
      id: id,
      image: image,
      name: name,
      quantity: quantity,
      duration_ms: totalDurationMs,
      tracks: listTracks,
    })
    setBackgroundImage(image)
  }

  useEffect(() => {
    const firstPlaylist = userPlaylists[0]
    selectedPlaylist(firstPlaylist.id, firstPlaylist.image, firstPlaylist.name)
  }, [isLoading])

  return (
    <Carousel>
      <CarouselContent>
        {isLoading &&
          Array.from({ length: 5 }).map((_, i) => (
            <CarouselItem
              key={i}
              className="flex-shrink-0 w-[132px] md:basis-1/2 lg:basis-1/3 xl:basis-1/4 2xl:basis-1/5 scale-95"
            >
              <SkeletonPlaylistImage />
              <Skeleton className="overflow-hidden w-[132px] h-[36px] rounded-md mt-2" />
            </CarouselItem>
          ))}

        {!isLoading &&
          userPlaylists.map((playlist: PlaylistInfosInterface) => (
            <CarouselItem
              key={playlist.id}
              className="flex-shrink-0 w-[132px] md:basis-1/2 lg:basis-1/3 xl:basis-1/4 2xl:basis-1/5 cursor-pointer scale-95 hover:scale-100 transform transition-transform duration-300"
              onClick={() =>
                selectedPlaylist(playlist.id, playlist.image, playlist.name)
              }
            >
              <Card className="h-[132px] w-[132px] p-0 rounded-md">
                <CardContent className="p-0">
                  <Image
                    src={playlist.image}
                    alt="Playlist image"
                    width={640}
                    height={640}
                    className="rounded-md"
                  />
                </CardContent>
              </Card>
              <p className="text-sm mt-1 tracking-wider line-clamp-2 overflow-hidden w-[132px]">
                {playlist.name}
              </p>
            </CarouselItem>
          ))}
      </CarouselContent>
    </Carousel>
  )
}
