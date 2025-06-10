'use client'

import { RotateCw } from 'lucide-react'
import { Button } from '../ui/button'
import ModalProcessing from '../modalProcessing'
import { useContext, useState } from 'react'
import { HomeContext } from '@/context/HomeContext'

interface PlaylistInfoProps {
  name: string
  quantity: number
  time: string
}

export default function PlaylistInfo(infos: PlaylistInfoProps) {
  const { selectedMusic } = useContext(HomeContext)
  const [openModal, setOpenModal] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const { name, quantity, time } = infos

  const handleProcessClick = () => {
    setIsProcessing(true)
    setOpenModal(true)
  }

  const handleModalClose = () => {
    setIsProcessing(false)
  }

  return (
    <div className="flex w-full h-5/12 px-12">
      <div className="w-2/3">
        <h2 className="font-bold sm:text-md sm:mb-1 2xl:mb-4 2xl:text-3xl">
          {name}
        </h2>
        <p className="uppercase text-xs tracking-[.08em]">
          {quantity} músicas, {time}
        </p>
      </div>
      <div className="w-1/3 flex justify-end">
        <Button
          className="bg-background text-foreground rounded-full font-light cursor-pointer hover:bg-[#D0D0D0] hover:text-background group disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleProcessClick}
          disabled={isProcessing || selectedMusic.length === 0}
        >
          <div className="transform transition-transform duration-300 group-hover:rotate-180">
            <RotateCw />
          </div>
          <span>{isProcessing ? 'Processando...' : 'Processar'}</span>
        </Button>
      </div>
      <ModalProcessing
        openModal={openModal}
        setOpenModal={setOpenModal}
        onCancel={() => handleModalClose()}
      />
    </div>
  )
}
