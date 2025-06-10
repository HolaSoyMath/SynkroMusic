import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'
import { TokenDataSynkro } from './types/dataSynkro'

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies()

  // Verificar se os cookies relacionados ao Spotify estão presentes e se o token expirou
  const spotifyExpiresInCookie = cookieStore.get('spotifyExpiresIn')
  if (spotifyExpiresInCookie) {
    const hasSpotifyTokenExpired =
      Date.now() >= Number(spotifyExpiresInCookie.value)

    if (hasSpotifyTokenExpired) {
      // Se o token expirou, deletar todos os cookies e redirecionar para o Login
      const allCookies = cookieStore.getAll()
      allCookies.forEach((cookie) => cookieStore.delete(cookie.name))

      return NextResponse.redirect(new URL('/', request.url))
    }

    // Se o token ainda está válido, redirecionar para a página Home
    return NextResponse.redirect(new URL('/home/playlists', request.url))
  }

  // Se o cookie spotifyExpiresIn não existir, verifique o sessionId na URL
  const sessionId = request.nextUrl.searchParams.get('sessionId')

  // Se não tiver sessionId e o cookie não for válido, redirecionar para Login
  if (!sessionId) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Com o SessionId, fazer request para pegar os tokens no Back
  const resp = await axios
    .create()
    .get(
      'https://music-api-integration.onrender.com/api/auth/get-token-by-cache',
      { params: { sessionId: sessionId } },
    )

  const data: TokenDataSynkro = resp.data
  const spotifyTokenExpires = Date.now() + data.spotifyTokenInfo.expiresIn

  // Armazenar os tokens e dados nos cookies
  cookieStore.set('spotifyAccessToken', data.spotifyTokenInfo.accessToken, {
    maxAge: data.spotifyTokenInfo.expiresIn,
  })
  cookieStore.set('spotifyRefreshToken', data.spotifyTokenInfo.refreshToken)
  cookieStore.set('spotifyExpiresIn', spotifyTokenExpires.toString())
  cookieStore.set('internalAccessToken', data.internalTokenInfo.accessToken)
  cookieStore.set(
    'internalExpiresIn',
    data.internalTokenInfo.expiresIn.toString(),
  )

  // Armazenar sessionId no cookie para persistência
  cookieStore.set('sessionId', sessionId)

  return NextResponse.redirect(new URL('/home/playlists', request.url))
}

export const config = {
  matcher: '/home',
}
