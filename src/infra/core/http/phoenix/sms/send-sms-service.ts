import { SendSms } from '../../../../../data/protocols/core/http/send-sms';
import { HttpClient } from '../../../../../data/protocols/core/http/web-service-rest-adapter';

export class SendSmsService implements SendSms {
  constructor(private readonly httpClient: HttpClient) {}

  async send(params: SendSms.Params): SendSms.Result {
    const result = await this.httpClient.request({
      method: 'POST',
      url: 'v1/sms',
      body: {
        message: params.message,
        msisdn: params.msisdn,
      },
      headers: {
        authorization: params.clientToken,
      },
    });

    if (!result) {
      return { status: false };
    }

    return { status: true };
  }
}
