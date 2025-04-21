import { SpotifyTrack } from '@/interface/SpotifyTrack'

export function sumMsDurationPlaylist(tracks: SpotifyTrack[]) {
  console.log("tracks:", tracks);
  
  return tracks.reduce((sum, track) => {
    return sum + track.duration_ms
  }, 0)
}
