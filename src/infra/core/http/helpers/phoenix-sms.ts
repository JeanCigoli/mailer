import axios from 'axios';
import { URLS } from '../../../../utils/config/constants';

export const phoenixSms = axios.create({
  baseURL: URLS.PHOENIX_SMS,
});
