import axios from 'axios';
import { GlobalConstants } from '../../GlobalConstants';

export function axiosInstance() {
  const queryDict: Map<string, string> = new Map();
  window.location.search
    .substr(1)
    .split('&')
    .forEach((item) => {
      queryDict.set(item.split('=')[0], item.split('=')[1]);
    });

  const instance = axios.create({
    baseURL: GlobalConstants.DEFAULT_API_URL,
    params: {
      key: queryDict.get('key'),
    },
    // headers: { Authorization: `bearer ${String(TokenProvider.getToken())}` },
  });
  return instance;
}
