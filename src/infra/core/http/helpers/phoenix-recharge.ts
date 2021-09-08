import axios from 'axios';
import { URLS } from '../../../../utils/config/constants';

export const phoenixRecharge = axios.create({
  baseURL: URLS.PHOENIX_RECHARGE,
});
