'use client'

import { msToMinAndSeconds } from '@/utils/msToMinuteAndSecond'
import { SetStateAction, useEffect, useState } from 'react'
import { Button } from '../ui/button'

interface ItemMusicProps {
  name: string
  durationMs: number
  musicId: string
  image: string
  setSelectedMusic: React.Dispatch<SetStateAction<string[]>>
  selectedMusics: string[]
  setLastSelectedMusic: React.Dispatch<SetStateAction<string>>
  setBackgroundImage: React.Dispatch<React.SetStateAction<string>>
}

export default function ItemMusic(musics: ItemMusicProps) {
  const {
    name,
    durationMs,
    musicId,
    image,
    selectedMusics,
    setSelectedMusic,
    setLastSelectedMusic,
    setBackgroundImage
  } = musics

  const checked = selectedMusics.includes(musicId)
  const [check, setCheck] = useState(checked)

  function changeMusicList(id: string, name: string, image: string) {
    setCheck(!check)

    setLastSelectedMusic(name)

    if (selectedMusics.includes(id)) {
      setSelectedMusic(selectedMusics.filter((musicId) => musicId !== id))
    } else {
      setSelectedMusic([...selectedMusics, id])
    }

    setBackgroundImage(image)
  }

  useEffect(() => {
    setLastSelectedMusic('Nenhuma música selecionada')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Button
      className="flex px-15 py-6 rounded-none w-full text-start bg-transparent shadow-none hover:bg-white/30 transform duration-300 cursor-pointer items-center"
      onClick={() => changeMusicList(musicId, name, image)}
    >
      <div className="w-1/12 h-full flex items-center">
        <input
          id={musicId}
          type="checkbox"
          checked={check}
          onChange={() => setCheck(!check)}
          color="red"
          className={`w-4 h-4 appearance-none cursor-pointer border-1 border-background rounded-sm transition-all duration-300 checked:bg-background `}
        />
      </div>

      <span className="uppercase text-xs tracking-[.08em] text-background w-10/12 line-clamp-1">
        {name}
      </span>
      <span className="uppercase text-xs tracking-[.08em] text-background w-1/12">
        {msToMinAndSeconds(durationMs)}
      </span>
    </Button>
  )
}
