import axios from 'axios';
import { URLS } from '../../../../utils/config/constants';

export const wavyMessage = axios.create({
  baseURL: URLS.WAVY_API,
});
