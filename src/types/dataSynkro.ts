export interface TokenDataSynkro {
  spotifyTokenInfo: {
    accessToken: string
    refreshToken: string
    expiresIn: number
  }
  internalTokenInfo: {
    accessToken: string
    expiresIn: number
  }
}

export interface DownloadedMusics {
  id: string,
  vocal: string,
  instrument: string
}