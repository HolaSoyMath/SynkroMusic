'use client'

import { msToMinAndSeconds } from '@/functions/msToMinuteAndSecond'
import { useContext, useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Check } from 'lucide-react'
import AnimatedParagraph from '../animatedParagraph'
import { HomeContext } from '@/context/HomeContext'
import { MusicProps } from '@/types/MusicInfo'

interface ItemMusicProps {
  name: string
  durationMs: number
  musicId: string
  image: string
  artist: string
  downloaded?: boolean
}

export default function ItemMusic(musics: ItemMusicProps) {
  const {
    selectedMusic,
    setSelectedMusic,
    setBackgroundImage,
    setLastSelectedMusic,
    downloadedMusics
  } = useContext(HomeContext)

  const { name, durationMs, musicId, image, artist, downloaded: propDownloaded } = musics

  // Verificar se a música está na lista de downloadedMusics
  const isDownloaded = propDownloaded || downloadedMusics.some(music => music.id === musicId)
  
  const checked = selectedMusic.some((music: MusicProps) => music.id === musicId) || isDownloaded
  const [check, setCheck] = useState(checked)
  const [hovered, setHovered] = useState(false)

  // Atualizar o estado de check quando selectedMusic ou downloadedMusics mudar
  useEffect(() => {
    const isSelected = selectedMusic.some((music: MusicProps) => music.id === musicId)
    setCheck(isSelected || isDownloaded)
  }, [selectedMusic, downloadedMusics, musicId, isDownloaded])

  function changeMusicList(id: string, name: string, image: string) {
    // Se a música já estiver baixada, não permitir alteração do estado de seleção
    if (isDownloaded) {
      // Garantir que a música baixada esteja na lista selectedMusic
      if (!selectedMusic.some((music: MusicProps) => music.id === id)) {
        setSelectedMusic([
          ...selectedMusic,
          { id: id, music: name, artist: artist },
        ])
      }
      // Manter o checkbox marcado
      setCheck(true)
      return
    }

    // Comportamento normal para músicas não baixadas
    setLastSelectedMusic({ music: name, artist: artist })
    
    if (selectedMusic.some((music: MusicProps) => music.id === id)) {
      setSelectedMusic(
        selectedMusic.filter((music: MusicProps) => music.id !== id),
      )
      setCheck(false)
    } else {
      setSelectedMusic([
        ...selectedMusic,
        { id: id, music: name, artist: artist },
      ])
      setCheck(true)
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
          data-downloaded={isDownloaded}
          id={musicId}
          type="checkbox"
          checked={check}
          onChange={() => changeMusicList(musicId, name, image)}
          color="red"
          className={`w-4 h-4 appearance-none cursor-pointer border-1 border-background transition-all duration-300 rounded-sm
            ${check && !isDownloaded && 'checked:bg-background'} 
            ${isDownloaded && 'bg-green-600 border-green-600 !rounded-full'}
            `}
        />
        {check && <Check className="text-foreground absolute" size={2} />}
        {isDownloaded && <Check className="text-foreground absolute" />}
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
