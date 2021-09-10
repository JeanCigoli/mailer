import {
  ButtonWhats,
  ListWhats,
  MessageDefault,
} from '../../../../domain/models';

export interface SendMessageWhatsApp {
  send(params: SendMessageWhatsApp.Params): SendMessageWhatsApp.Result;
}

export namespace SendMessageWhatsApp {
  export type Params = {
    credentials: {
      token: string;
      username: string;
    };
    body: ButtonWhats | ListWhats | MessageDefault;
  };

  export type Result = Promise<{
    status: boolean;
    id: string;
  }>;
}
