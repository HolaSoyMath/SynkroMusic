import axios from 'axios';
import Cookies from 'js-cookie'


export function useSynkroApi() {
  const accessToken = Cookies.get('internalAccessToken');

  return axios.create({
    baseURL: 'https://music-api-integration.onrender.com/api',
    timeout: 1000 * 60,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
}