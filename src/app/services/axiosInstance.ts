import axios from 'axios';
import { GlobalConstants } from '../../GlobalConstants';
import { LocalStorageProvider } from './LocalStorageProvider';

export function axiosInstance() {
  const apiKey = LocalStorageProvider.getData()?.authData;

  const instance = axios.create({
    baseURL: GlobalConstants.DEFAULT_API_URL,
    params: {
      key: apiKey,
    },
    // headers: { Authorization: `bearer ${String(TokenProvider.getToken())}` },
  });
  return instance;
}
