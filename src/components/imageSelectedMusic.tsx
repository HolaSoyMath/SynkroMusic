import Image from "next/image";

interface ImageSelectedMusicProps {
  className?: string;
}

export default function ImageSelectedMusic( {className}: ImageSelectedMusicProps) {
  return (
    <Image
      src={
        "https://mosaic.scdn.co/640/ab67616d00001e0213a5f8122fc3e42eef62668fab67616d00001e028f3fe7058adcbf68f64184c1ab67616d00001e028f5bc6abdbb6316f3b73d4c1ab67616d00001e02ae6772364839239f80a49716"
      }
      alt="Logo music"
      fill={true}
      className={`object-cover ${className}`}
    />
  );
}
