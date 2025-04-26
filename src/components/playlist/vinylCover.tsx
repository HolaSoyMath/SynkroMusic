import Image from 'next/image'
import ImageSelectedMusic from '../imageSelectedMusic'

export default function VinylCover() {
  return (
    <div className="relative">
      <div className="absolute w-[204px] h-full">
        <ImageSelectedMusic />
      </div>
      <Image
        src={"/image-music.png"}
        alt="Base template image music"
        width={300}
        height={100}
      />
    </div>
  )
}
