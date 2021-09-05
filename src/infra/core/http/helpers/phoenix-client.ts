import axios from 'axios';
import { URLS } from '../../../../utils/config/constants';

export const phoenixClient = axios.create({
  baseURL: URLS.PHOENIX_BASE_URL,
});
