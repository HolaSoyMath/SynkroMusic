import Image from "next/image";

interface ImageSelectedMusicProps {
  image: string
  className?: string;
}

export default function ImageSelectedMusic( {className, image}: ImageSelectedMusicProps) {
  return (
    <Image
      src={
        image
      }
      alt="Logo music"
      fill={true}
      className={`object-cover ${className}`}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  );
}
