'use client'

import { Card, CardContent } from '../ui/card'
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useSpotifyApi } from '@/app/api/apiSpotify'
import SkeletonPlaylistImage from '../skeleton/playlistImage'
import { Skeleton } from '../ui/skeleton'
import PlaylistInfosInterface from '@/interface/PlaylistInfos'
import { sumMsDurationPlaylist } from '@/utils/sumMsDurationPlaylist'
import { SpotifyTrack } from '@/interface/SpotifyTrack'

interface PlaylistCarouselProps {
  setUserPlaylist: React.Dispatch<
    React.SetStateAction<PlaylistInfosInterface | null>
  >
  setBackgroundImage: React.Dispatch<React.SetStateAction<string>>
}

export default function PlaylistCarousel({
  setUserPlaylist,
  setBackgroundImage,
}: PlaylistCarouselProps) {
  const { data: session } = useSession()
  const [isLoading, setIsLoading] = useState(true)
  const api = useSpotifyApi()
  const [userPlaylists, setUserPlaylists] = useState<PlaylistInfosInterface[]>(
    [],
  )

  useEffect(() => {
    async function getPlaylists() {
      const userId = session?.token.sub

      try {
        const { data } = await api.get(`/users/${userId}/playlists`)

        const playlists = data.items.map(
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
        setIsLoading(false)

        const firstPlaylist = playlists[0]
        selectedPlaylist(
          firstPlaylist.id,
          firstPlaylist.image,
          firstPlaylist.name,
        )
        setBackgroundImage(firstPlaylist.image)
      } catch (error) {
        console.error('Erro ao buscar playlists:', error)
      }
    }

    getPlaylists()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session])

  async function selectedPlaylist(id: string, image: string, name: string) {
    const { data } = await api.get(`/playlists/${id}/tracks`)

    // @ts-expect-error - O "item" nao tem uma interface criada, por isso apresentará um erro, mas está ok
    const listTracks: SpotifyTrack[] = data.items.map((item) => {
      return {
        id: item.track.id,
        name: item.track.name,
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
          userPlaylists.map((playlist) => (
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
