import axios from 'axios';
import Cookies from 'js-cookie'


export function useSynkroApi() {
  const accessToken = Cookies.get('internalAccessToken');

  return axios.create({
    baseURL: 'https://music-api-integration-prod.onrender.com/api',
    timeout: 1000 * 300,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
}