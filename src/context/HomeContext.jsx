'use client'

import { createContext, useState } from 'react'

export const HomeContext = createContext()

export const HomeProvider = ({ children }) => {
  const [selectedMusic, setSelectedMusic] = useState([])
  const [backgroundImage, setBackgroundImage] = useState('')
  const [lastSelectedMusic, setLastSelectedMusic] = useState({
    music: '',
    artist: '',
  })
  const [userPlaylist, setUserPlaylist] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [userPlaylists, setUserPlaylists] = useState([])

  return (
    <HomeContext.Provider value={{ selectedMusic, setSelectedMusic, backgroundImage, setBackgroundImage, lastSelectedMusic, setLastSelectedMusic, userPlaylist, setUserPlaylist, isLoading, setIsLoading, userPlaylists, setUserPlaylists }}>
      {children}
    </HomeContext.Provider>
  )
}
