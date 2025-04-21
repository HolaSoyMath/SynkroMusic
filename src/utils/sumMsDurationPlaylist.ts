import { SpotifyTrack } from '@/interface/SpotifyTrack'

export function sumMsDurationPlaylist(tracks: SpotifyTrack[]) {
  return tracks.reduce((sum, track) => {
    return sum + track.duration_ms
  }, 0)
}
