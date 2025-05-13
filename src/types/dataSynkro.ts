export interface DataSynkro {
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
