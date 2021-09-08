import axios from 'axios';
import { URLS } from '../../../../utils/config/constants';

export const phoenixAuthenticator = axios.create({
  baseURL: URLS.PHOENIX_AUTHENTICATOR,
});
