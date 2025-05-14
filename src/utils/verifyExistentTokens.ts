import { getLocalStorage } from '@/functions/getLocalStorage'

export default async function verifyExistentTokens() {
  const spotifyExpiresAt = getLocalStorage('spotifyExpiresAccessToken')
  const internalExpiresAt = getLocalStorage('internalExpiresAccessToken')
  const token = getLocalStorage('spotifyAccessToken')

  if (!token || !spotifyExpiresAt || !internalExpiresAt) {
    console.log(
      'Token ou data de expiração está faltando, redirecionado para tela de Login...',
    )
    window.localStorage.clear()
    return false
  }

  return true
}
