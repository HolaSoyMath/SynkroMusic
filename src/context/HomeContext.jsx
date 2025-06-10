'use client'

import { createContext, useState } from 'react'

export const HomeContext = createContext()

export const HomeProvider = ({ children }) => {
  const [selectedMusic, setSelectedMusic] = useState([])
  const [backgroundImage, setBackgroundImage] = useState('')
  const [lastSelectedMusic, setLastSelectedMusic] = useState({
    music: '',
    artist: '',
    linkVocal: '',
    linkInstruments: '',
  })
  const [userPlaylist, setUserPlaylist] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [userPlaylists, setUserPlaylists] = useState([])
  const [currentTime, setCurrentTime] = useState(0)

  return (
    <HomeContext.Provider value={{
      selectedMusic,
      setSelectedMusic,
      backgroundImage,
      setBackgroundImage,
      lastSelectedMusic,
      setLastSelectedMusic,
      userPlaylist,
      setUserPlaylist,
      isLoading,
      setIsLoading,
      userPlaylists,
      setUserPlaylists,
      currentTime,
      setCurrentTime
    }}>
      {children}
    </HomeContext.Provider>
  )
}
