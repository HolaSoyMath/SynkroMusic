import Image from 'next/image'
import PlaylistCarousel from '../playlist/playlistCarousel'
import PlaylistInfo from '../playlist/playlistInfo'

export default function HomeTemplate() {
  return (
    <div className="w-full h-full flex">
      <section className="h-full w-1/2 bg-foreground text-background">
        {/* Parte superior */}
        <div className="h-1/2 bg-background flex justify-center items-center">
          <Image
            src={'/spotify-logo.svg'}
            alt="Spotify-logo"
            width={100}
            height={100}
          />
        </div>

        {/* Parte inferior */}
        <div className="h-1/2 pt-7 flex flex-col ">
          <PlaylistInfo name="Playlist 14" quantity={15} time="1h30m" />
          <PlaylistCarousel />
        </div>
      </section>
      <section className="h-full w-1/2 bg-blue-300">Lado direito</section>
    </div>
  )
}
