import { RotateCw } from 'lucide-react'
import { Button } from '../ui/button'

interface PlaylistInfoInterface {
  name: string
  quantity: number
  time: string
}

export default function PlaylistInfo(infos: PlaylistInfoInterface) {

  const { name, quantity, time } = infos

  return (
    <div className="flex w-full h-5/12">
      <div className="w-2/3  pl-12">
        <h2 className='font-bold text-3xl'>{name}</h2>
        <p className="uppercase text-xs tracking-[.08em]">{quantity} músicas, {time}</p>
      </div>
      <div className="w-1/3 flex justify-center">
        <Button className="bg-background text-foreground rounded-full font-light">
          <RotateCw />
          <span>Processar</span>
        </Button>
      </div>
    </div>
  )
}
