import axios from 'axios';
import { URLS } from '../../../../utils/config/constants';

export const phoenixRechargeClient = axios.create({
  baseURL: URLS.PHOENIX_RECHARGE,
});

export const phoenixManagerCardClient = axios.create({
  baseURL: URLS.PHOENIX_MANAGER_CARD,
});
export const phoenixConsumptionClient = axios.create({
  baseURL: URLS.PHOENIX_CONSUMPTION,
});
export const phoenixAuthenticatorClient = axios.create({
  baseURL: URLS.PHOENIX_AUTHENTICATOR,
});
export const phoenixSmsClient = axios.create({
  baseURL: URLS.PHOENIX_SMS,
});
