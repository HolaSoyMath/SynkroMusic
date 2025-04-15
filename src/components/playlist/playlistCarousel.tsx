import { Card, CardContent } from '../ui/card'
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel'

export default function PlaylistCarousel() {
  return (
    <div className=" w-full h-7/12">
      <p className="uppercase text-xs tracking-[.08em] pl-10 mb-5 text-background">
        Outras playlists
      </p>
      <div className="w-full max-w-full ">
        <Carousel className="w-full">
          <CarouselContent className="px-10">
            {Array.from({ length: 10 }).map((_, index) => (
              <CarouselItem key={index} className="basis-1/4">
                <Card className="h-[132px] w-[132px] rounded-none">
                  <CardContent>
                    <span>Index: {index}</span>
                  </CardContent>
                </Card>
                <p>Playlistname</p>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  )
}
