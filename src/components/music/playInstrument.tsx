'use client'

import { useState } from 'react'
import { Button } from '../ui/button'
import { Pause, Play } from 'lucide-react'
import { msToMinAndSeconds } from '@/utils/msToMinuteAndSecond'
import { Slider } from '../ui/slider'

interface PlayInstrumentProps {
  name: string
}

export default function PlayInstrument(props: PlayInstrumentProps) {
  const { name } = props

  const [play, setPlay] = useState(true)

  return (
    <div className="flex items-center px-10 py-4 bg-white/30 w-full h-1/2 gap-4">
      <span className="uppercase text-xs tracking-widest text-background w-5/12 min-w-[115px] max-w-[120px] line-clamp-1 font-semibold">
        {name}
      </span>
      <Button
        onClick={() => setPlay(!play)}
        className="cursor-pointer bg-transparent border-none shadow-none hover:bg-transparent"
      >
        {play && <Play className="fill-background" />}
        {!play && <Pause className="fill-background" />}
      </Button>
      <Slider defaultValue={[0]} max={100} step={1} />
      <span className=" text-right uppercase text-xs tracking-[.08em] text-background w-2/12">
        {msToMinAndSeconds(165478)}
      </span>
    </div>
  )
}
