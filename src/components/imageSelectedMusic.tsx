import { HomeContext } from '@/context/HomeContext'
import Image from 'next/image'
import { useContext } from 'react'

interface ImageSelectedMusicProps {
  className?: string
}

export default function ImageSelectedMusic({
  className,
}: ImageSelectedMusicProps) {
  const { backgroundImage } = useContext(HomeContext)

  const image = backgroundImage || '/loading.svg'

  return (
    <Image
      src={image}
      alt="Logo music"
      fill={true}
      className={`object-cover ${className}`}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  )
}
