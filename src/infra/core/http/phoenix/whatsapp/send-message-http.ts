import { HttpClient } from '../../../../../data/protocols/core/http';
import { SendMessageWhatsApp } from '../../../../../data/protocols/whatsapp/http';

export class SendMessageHttp implements SendMessageWhatsApp {
  constructor(private readonly httpClient: HttpClient) {}

  async send(params: SendMessageWhatsApp.Params): SendMessageWhatsApp.Result {
    const result = await this.httpClient.request({
      method: 'POST',
      url: 'whatsapp/send',
      body: params.body,
      headers: {
        username: params.credentials.username,
        authenticationToken: params.credentials.token,
      },
    });

    if (result.statusCode > 299) {
      return {
        status: false,
        id: '',
      };
    }

    return {
      status: true,
      id: result.body.id,
    };
  }
}
