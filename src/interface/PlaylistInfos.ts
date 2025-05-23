import { SpotifyTrack } from './SpotifyTrack'

export default interface PlaylistInfosInterface {
  id: string
  image: string
  name: string
  quantity: number
  duration_ms?: number
  tracks?: SpotifyTrack[]
}
