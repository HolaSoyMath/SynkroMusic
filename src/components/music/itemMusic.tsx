'use client'

import { msToMinAndSeconds } from '@/functions/msToMinuteAndSecond'
import { useContext, useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Check } from 'lucide-react'
import AnimatedParagraph from '../animatedParagraph'
import { HomeContext } from '@/context/HomeContext'
import { MusicProps } from '@/interface/MusicInfo'

interface ItemMusicProps {
  name: string
  durationMs: number
  musicId: string
  image: string
  artist: string
  downloaded: boolean
}

export default function ItemMusic(musics: ItemMusicProps) {
  const {
    selectedMusic,
    setSelectedMusic,
    setBackgroundImage,
    setLastSelectedMusic,
  } = useContext(HomeContext)

  const { name, durationMs, musicId, image, artist, downloaded } = musics

  const checked = selectedMusic.includes(musicId)
  const [check, setCheck] = useState(checked)
  const [hovered, setHovered] = useState(false)

  function changeMusicList(id: string, name: string, image: string) {
    setCheck(!check)

    setLastSelectedMusic({ music: name, artist: artist })

    if (selectedMusic.some((music: MusicProps) => music.id === id)) {
      setSelectedMusic(
        selectedMusic.filter((music: MusicProps) => music.id !== id),
      )
    } else {
      setSelectedMusic([
        ...selectedMusic,
        { id: id, music: name, artist: artist },
      ])
    }

    setBackgroundImage(image)
  }

  useEffect(() => {
    console.log('selectedMusic', selectedMusic)
    setLastSelectedMusic({ music: 'Nenhuma música selecionada', artist: '' })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMusic])

  return (
    <Button
      className="flex px-15 py-6 rounded-none w-full text-start bg-transparent shadow-none hover:bg-white/30 transform duration-300 cursor-pointer items-center"
      onClick={() => changeMusicList(musicId, name, image)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="w-1/12 h-full flex items-center relative">
        <input
          id={musicId}
          type="checkbox"
          checked={check}
          onChange={() => setCheck(!check)}
          color="red"
          className={`w-4 h-4 appearance-none cursor-pointer border-1 border-background transition-all duration-300 rounded-sm 
            ${check && 'checked:bg-background'} 
            ${downloaded && 'rounded-full bg-green-600 border-green-600'}
            `}
        />
        {check && <Check className="text-foreground absolute" size={2} />}
        {downloaded && <Check className="text-foreground absolute" />}
      </div>

      <div className="w-full max-w-10/12">
        <AnimatedParagraph name={name} hovered={hovered} />
        <p className="text-xs text-background/50">{artist}</p>
      </div>
      <span className="uppercase text-xs tracking-[.08em] text-background w-1/12">
        {msToMinAndSeconds(durationMs)}
      </span>
    </Button>
  )
}
