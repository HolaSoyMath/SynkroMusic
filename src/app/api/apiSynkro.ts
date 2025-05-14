import axios from 'axios';
import Cookies from 'js-cookie'


export function useSynkroApi() {
  const accessToken = Cookies.get('spotifyAccessToken');

  return axios.create({
    baseURL: 'https://music-api-integration.onrender.com/api',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
}
