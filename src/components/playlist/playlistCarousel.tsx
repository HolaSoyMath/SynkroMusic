import { UserPlaylistsSpotify } from "@/mock/GetUserPlaylistSpotify";
import { Card, CardContent } from "../ui/card";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import Image from "next/image";

export default function PlaylistCarousel() {
  const userPLaylists = UserPlaylistsSpotify;
  const playlists = userPLaylists.items;

  return (
    <Carousel>
      <CarouselContent>
        {playlists.map((playlist) => (
          <CarouselItem
            key={playlist.id}
            className="flex-shrink-0 w-[132px] md:basis-1/2 lg:basis-1/3 xl:basis-1/4 2xl:basis-1/5 cursor-pointer scale-95 hover:scale-100 transform transition-transform duration-300"
          >
            <Card className="h-[132px] w-[132px] p-0 rounded-md">
              <CardContent className="p-0">
                <Image
                  src={playlist.images[0].url}
                  alt="Playlist image"
                  width={640}
                  height={640}
                  className="rounded-md"
                />
              </CardContent>
            </Card>
            <p className="text-sm mt-1 tracking-wider line-clamp-2 overflow-hidden w-[132px]">{playlist.name}</p>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
