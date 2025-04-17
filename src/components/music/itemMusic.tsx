import { formatTime } from "@/utils/msToMinuteAndSecond"

interface ItemMusicProps {
  name: string
  durationMs: number
}

export default function ItemMusic(musics: ItemMusicProps) {

  const {name, durationMs} = musics

  return(
    <div className="flex px-15 py-4 hover:bg-white/30 transform duration-300 cursor-pointer">
      <span className="uppercase text-xs tracking-[.08em] text-background w-1/12">QQ</span>
      <span className="uppercase text-xs tracking-[.08em] text-background w-10/12 line-clamp-1">{name}</span>
      <span className="uppercase text-xs tracking-[.08em] text-background w-1/12">{formatTime(durationMs)}</span>
    </div>
  )
}