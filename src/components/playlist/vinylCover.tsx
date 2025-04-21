import Image from 'next/image'
import ImageSelectedMusic from '../imageSelectedMusic'

interface VinylCoverProps{
  image: string
}

export default function VinylCover({ image }: VinylCoverProps) {
  return (
    <div className="relative">
      <div className="absolute w-[204px] h-full">
        <ImageSelectedMusic image={image} />
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
