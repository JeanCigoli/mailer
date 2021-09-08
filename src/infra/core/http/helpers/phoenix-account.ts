import axios from 'axios';
import { URLS } from '../../../../utils/config/constants';

export const phoenixAccount = axios.create({
  baseURL: URLS.PHOENIX_ACCOUNT_MANAGER,
});
