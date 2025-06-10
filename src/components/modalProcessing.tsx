'use client'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import Image from 'next/image'
import { Progress } from './ui/progress'
import { Button } from './ui/button'
import { useContext, useEffect, useRef, useState } from 'react'
import { useSynkroApi } from '@/app/api/apiSynkro'
import { HomeContext } from '@/context/HomeContext'
import { ResponseDownloadedMusicsAPI } from '@/mock/ResponseDownloadedMusicsAPI'
import { MusicProps } from '@/types/MusicInfo'
import { SpotifyTrack } from '@/types/SpotifyTrack'

interface ModalProcessingProps {
  openModal: boolean
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
  onCancel?: () => void
}

export default function ModalProcessing({
  openModal,
  setOpenModal,
  onCancel,
}: ModalProcessingProps) {
  const [progress, setProgress] = useState(0)
  const [completed, setCompleted] = useState(false)
  const [jobId, setJobId] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isTesting, setIsTesting] = useState(true) // Modo de teste
  
  const api = useSynkroApi()
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const controllerRef = useRef<AbortController | null>(null)
  
  const { selectedMusic, userPlaylist, setUserPlaylist } = useContext(HomeContext)

  const handleCancel = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (controllerRef.current) controllerRef.current.abort()
    if (onCancel) onCancel()
    setOpenModal(false)
  }
  
  // Função para lidar com cliques fora do modal
  const handleOpenChange = (open: boolean) => {
    // Se o usuário está tentando fechar o modal e o processamento está em andamento, não permitir
    if (!open && progress > 0 && progress < 100 && !error) {
      return
    }
    
    // Caso contrário, permitir o fechamento
    setOpenModal(open)
    if (!open) {
      handleCancel()
    }
  }

  // Transformando em function declaration em vez de const arrow function
  function updateProgress() {
    console.log('update context chamado')
    
    if (isTesting) {
      // Lógica de teste: 0% -> 80% -> 100%
      if (progress === 0) {
        setTimeout(() => {
          console.log('Atualizando para 80%')
          setProgress(80)
        }, 2000)
      } else if (progress === 80) {
        setTimeout(() => {
          console.log('Atualizando para 100%')
          setProgress(100)
          setCompleted(true)
          
          // Usar o mock de resposta da API
          const downloadedTracks = ResponseDownloadedMusicsAPI
          
          // Atualizar o userPlaylist com as músicas baixadas
          if (userPlaylist?.tracks) {
            const updatedTracks = userPlaylist.tracks.map((track: SpotifyTrack) => {
              const downloadedTrack = downloadedTracks.find(dt => dt.id === track.id)
              if (downloadedTrack) {
                return {
                  ...track,
                  downloaded: true,
                  vocal: downloadedTrack.vocal,
                  instrument: downloadedTrack.instrument,
                }
              }
              return track
            })

            // Atualizar o userPlaylist no contexto
            setUserPlaylist({
              ...userPlaylist,
              tracks: updatedTracks,
            })
            
            console.log('Playlist atualizada com músicas baixadas:', updatedTracks)
          }
          
          // Fechar o modal após a conclusão
          setTimeout(() => {
            setOpenModal(false)
          }, 1000) // Pequeno delay para mostrar 100% antes de fechar
        }, 2000)
      }
      return
    }
    
    // Código original para ambiente de produção
    api.get(`/verify-task/${jobId}`)
      .then(response => {
        const currentProgress = response.data.progress
        setProgress(currentProgress)
        console.log('progresso atual:', currentProgress)

        if (currentProgress >= 100) {
          clearInterval(intervalRef.current!)
          setCompleted(true)
          
          // Usar o mock de resposta da API
          const downloadedTracks = ResponseDownloadedMusicsAPI
          
          // Atualizar o userPlaylist com as músicas baixadas
          if (userPlaylist?.tracks) {
            const updatedTracks = userPlaylist.tracks.map((track: SpotifyTrack) => {
              const downloadedTrack = downloadedTracks.find(dt => dt.id === track.id)
              if (downloadedTrack) {
                return {
                  ...track,
                  downloaded: true,
                  vocal: downloadedTrack.vocal,
                  instrument: downloadedTrack.instrument,
                }
              }
              return track
            })

            // Atualizar o userPlaylist no contexto
            setUserPlaylist({
              ...userPlaylist,
              tracks: updatedTracks,
            })
            
            console.log('Playlist atualizada com músicas baixadas:', updatedTracks)
          }
          
          // Fechar o modal após a conclusão
          setTimeout(() => {
            setOpenModal(false)
          }, 1000) // Pequeno delay para mostrar 100% antes de fechar
        }
      })
      .catch(err => {
        console.error('Erro ao buscar progresso:', err)
        clearInterval(intervalRef.current!)
        if (onCancel) onCancel()
        setOpenModal(false)
      })
  }

  // Função para enviar músicas para download e obter jobId
  const sendMusicsToDownload = async () => {
    setIsLoading(true)
    setError('')
    controllerRef.current = new AbortController()
    
    if (isTesting) {
      // No modo de teste, apenas simular o início do processo
      setJobId('test-job-id')
      setIsLoading(false)
      return 'test-job-id'
    }
    
    const musicsToDownload = selectedMusic.map((music: MusicProps) => ({
      id: music.id,
      song: music.music,
      author: music.artist,
    }))
    
    try {
      const response = await api.post(`/download/playlist`, musicsToDownload, {
        signal: controllerRef.current.signal,
      })
      setJobId(response.data.jobId)
      setIsLoading(false)
      return response.data.jobId
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setIsLoading(false)
      if (error.name === 'CanceledError') {
        console.log('Requisição cancelada')
      } else {
        console.error('Erro na requisição', error)
        setError('Erro ao processar músicas. Tente novamente.')
      }
      setOpenModal(false)
      return null
    }
  }

  useEffect(() => {
    if (openModal) {
      console.log('Modal aberto, iniciando processo...')
      // Iniciar o processo de download quando o modal for aberto
      sendMusicsToDownload().then(newJobId => {
        if (newJobId) {
          console.log('Job ID obtido:', newJobId)
          if (isTesting) {
            // No modo de teste, chamar updateProgress diretamente
            updateProgress()
          } else {
            // Iniciar o polling de progresso
            intervalRef.current = setInterval(updateProgress, 2000) // Aumentei o intervalo para 2 segundos
          }
        }
      })
    }
    
    return () => {
      // Limpar intervalo quando o componente for desmontado
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      // Cancelar requisição pendente
      if (controllerRef.current) {
        controllerRef.current.abort()
      }
    }
  }, [openModal])

  return (
    <Dialog open={openModal} onOpenChange={handleOpenChange}>
      <DialogContent className="bg-foreground flex">
        <div className="bg-background rounded-full h-13 w-auto">
          <Image
            src={'/loading.svg'}
            alt="Loading"
            fill={true}
            className="!sticky"
          />
        </div>
        <div className="flex flex-col gap-y-2 flex-1">
          <DialogHeader className="flex flex-row pt-1 h-13">
            <div className="h-full">
              <DialogTitle className="font-semibold text-background h-1/2 flex items-end">
                {isLoading ? 'Iniciando...' : 'Processando'}
              </DialogTitle>
              <DialogDescription className="tracking-[.08em] h-1/2">
                {error || 'Isso pode levar alguns segundos'}
              </DialogDescription>
            </div>
          </DialogHeader>
          <div className="w-full">
            <Progress value={progress} className="w-full" />
          </div>
          <p className="tracking-[.08em] text-background">{progress}%...</p>
          <DialogFooter className="flex justify-end">
            <DialogClose asChild>
              <Button
                className="tracking-[.08em] cursor-pointer bg-transparent border-none shadow-none hover:bg-primary"
                onClick={handleCancel}
                id="cancel-button"
                disabled={completed || isLoading} // Desabilitar durante o carregamento também
              >
                Cancelar
              </Button>
            </DialogClose>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}
