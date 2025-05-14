import { getLocalStorage } from '@/functions/getLocalStorage'

export default async function verifyExpiresTokens() {
  const spotifyExpiresAt = getLocalStorage('spotifyExpiresAccessToken')
  const internalExpiresAt = getLocalStorage('internalExpiresAccessToken')

  if (
    Date.now() >= Number(spotifyExpiresAt) ||
    Date.now() >= Number(internalExpiresAt)
  ) {
    console.log('Token expirado, redirecionando para tela de Login...')
    window.localStorage.clear()
    return false
  }

  return true
}
