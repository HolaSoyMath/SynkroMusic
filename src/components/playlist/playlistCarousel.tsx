'use client'

import { Card, CardContent } from '../ui/card'
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useSpotifyApi } from '@/app/api/apiSpotify'

interface UserPlaylistInterface {
  id: string
  image: string
  name: string
}

export default function PlaylistCarousel() {
  const { data: session, status } = useSession()
  const api = useSpotifyApi()
  const [userPlaylists, setUserPlaylists] = useState<UserPlaylistInterface[]>(
    [],
  )

  useEffect(() => {
    if (status !== 'authenticated') return

    async function getPlaylists() {
      // session está garantido como definido se chegamos aqui
      const userId = session?.token.sub

      try {
        const { data } = await api.get(
          `/users/${userId}/playlists`,
        )

        const playlists = data.items.map(
          (item: { id: string; images: { url: string }[]; name: string }) => ({
            id: item.id,
            image: item.images[0].url,
            name: item.name,
          }),
        )

        setUserPlaylists(playlists)
      } catch (error) {
        console.error('Erro ao buscar playlists:', error)
      }
    }

    getPlaylists()
  }, [session, status])

  return (
    <Carousel>
      <CarouselContent>
        {userPlaylists.map((playlist) => (
          <CarouselItem
            key={playlist.id}
            className="flex-shrink-0 w-[132px] md:basis-1/2 lg:basis-1/3 xl:basis-1/4 2xl:basis-1/5 cursor-pointer scale-95 hover:scale-100 transform transition-transform duration-300"
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
