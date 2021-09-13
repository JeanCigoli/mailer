import { Credentials } from '../../../../utils/base64';

export type TransformCredentials = (base: string) => Credentials;
