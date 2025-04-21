import { PlaylistTrackItem } from '@/interface/SpotifyTrack'

export function sumMsDurationPlaylist(tracks: PlaylistTrackItem[]) {
  return tracks.reduce((sum, track) => {
    return sum + track.track.duration_ms
  }, 0)
}
