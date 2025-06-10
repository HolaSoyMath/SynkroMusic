/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '../ui/button'
import { Pause, Play } from 'lucide-react'
import { Slider } from '../ui/slider'
import { secondsToMinAndSeconds } from '@/functions/sToMinuteAndSecond'

interface PlayInstrumentProps {
  name: string,
  linkSong: string,
  sharedTime: number,
  onTimeUpdate: (time: number) => void
}

export default function PlayInstrument(props: PlayInstrumentProps) {
  const { name, linkSong, sharedTime, onTimeUpdate } = props

  const [play, setPlay] = useState(false)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      onTimeUpdate(audioRef.current.currentTime)
    }
  }

  const handleEnded = () => {
    setPlay(false)
    onTimeUpdate(0)
  }

  const handleSliderChange = (value: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value
      onTimeUpdate(value)
    }
  }

  const togglePlay = () => {
    if (audioRef.current) {
      if (play) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setPlay(!play)
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('timeupdate', handleTimeUpdate)
      audioRef.current.addEventListener('ended', handleEnded)
      audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata)

      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener('timeupdate', handleTimeUpdate)
          audioRef.current.removeEventListener('ended', handleEnded)
          audioRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata)
        }
      }
    }
  }, [])

  // Sincronizar com o tempo compartilhado
  useEffect(() => {
    if (audioRef.current && Math.abs(audioRef.current.currentTime - sharedTime) > 0.5) {
      audioRef.current.currentTime = sharedTime
    }
  }, [sharedTime])

  return (
    <div className="flex items-center px-10 py-4 bg-white/30 w-full h-1/2 gap-4">
      <span className="uppercase text-xs tracking-widest text-background w-5/12 min-w-[115px] max-w-[120px] line-clamp-1 font-semibold">
        {name}
      </span>

      <Button
        onClick={togglePlay}
        className="cursor-pointer bg-transparent border-none shadow-none hover:bg-transparent"
      >
        {play ? <Pause className="fill-background" /> : <Play className="fill-background" />}
      </Button>

      <Slider
        value={[sharedTime]}  
        onValueChange={(value: number[]) => handleSliderChange(value[0])}
        max={duration}
        step={1}
      />

      <span className="text-right uppercase text-xs tracking-[.08em] text-background w-2/12">
        {secondsToMinAndSeconds(sharedTime)}
      </span>

      <audio ref={audioRef} src={linkSong} />
    </div>
  )
}
