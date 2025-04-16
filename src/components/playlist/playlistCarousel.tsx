import { UserPlaylistsSpotify } from '@/mock/GetUserPlaylistSpotify'
import { Card, CardContent } from '../ui/card'
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel'
import Image from 'next/image'

export default function PlaylistCarousel() {
  const userPLaylists = UserPlaylistsSpotify
  const playlists = userPLaylists.items

  return (
    <div className=" w-full h-7/12">
      <p className="uppercase text-xs tracking-[.08em] pl-10 mb-5 text-background">
        Outras playlists
      </p>
      <div className="w-full max-w-full overflow-hidden">
        <Carousel className="w-full">
          <CarouselContent className="flex gap-x-4">
            {playlists.map((playlist) => (
              <CarouselItem key={playlist.id} className="flex-shrink-0 w-[132px]">
                <Card className="h-[132px] w-[132px] rounded-none p-0">
                  <CardContent className='p-0'>
                    <Image
                      src={
                        playlist.images[0].url
                      }
                      alt="Playlist image"
                      width={640}
                      height={640}
                    />
                  </CardContent>
                </Card>
                <p className=''>{playlist.name}</p>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  )
}
