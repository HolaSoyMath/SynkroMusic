import PlaylistCarousel from "../playlist/playlistCarousel";
import PlaylistInfo from "../playlist/playlistInfo";
import VinylCover from "../playlist/vinylCover";

export default function HomeTemplate() {
  return (
    <div className="w-full h-full flex">
      <section className="h-full w-1/2 bg-foreground text-background">
        {/* Parte superior */}
        <div className="h-1/2 bg-background flex justify-center items-center">
          <VinylCover />
        </div>

        {/* Parte inferior */}
        <div className="h-1/2 pt-7 flex flex-col ">
          <PlaylistInfo name="Playlist 14" quantity={15} time="1h30m" />
          <div className=" w-full h-7/12 pl-10">
            <p className="uppercase text-xs tracking-[.08em] mb-5 text-background">
              Outras playlists
            </p>
            <PlaylistCarousel />
          </div>
        </div>
      </section>
      <section className="h-full w-1/2 bg-blue-300">Lado direito</section>
    </div>
  );
}
