import nodemailer, { Transporter } from 'nodemailer';
import path from 'path';
import nodemailerHbs from 'nodemailer-express-handlebars';
import expHbs from 'express-handlebars';
import { formatCredentialTransport } from '../../../utils/formatter/format-credential-transport';

type Credentials = {
  user: string;
  password: string;
  host: string;
  port: number;
  alias: string;
};

type Transports = {
  alias: string;
  transport: Transporter;
};

export class MailerServer {
  private transports: Transports[] = [];
  private pathTemplate!: string;

  private static instance: MailerServer;

  constructor() {
    this.pathTemplate = path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      'templates',
    );
  }

  public static getInstance(): MailerServer {
    if (!MailerServer.instance) {
      MailerServer.instance = new MailerServer();
    }

    return MailerServer.instance;
  }

  setTransports(credentials: Credentials, type: 'gmail' | 'smtp' | 'test') {
    const transport = nodemailer.createTransport(
      formatCredentialTransport(credentials, type),
    );

    transport.use(
      'compile',
      nodemailerHbs({
        viewEngine: expHbs.create({
          layoutsDir: this.pathTemplate,
          partialsDir: this.pathTemplate,
          defaultLayout: path.resolve(this.pathTemplate, 'default', 'main'),
          extname: '.hbs',
        }),
        viewPath: this.pathTemplate,
        extName: '.hbs',
      }),
    );

    this.transports.push({
      alias: credentials.alias,
      transport: transport,
    });
  }

  closeAll() {
    this.transports.map((value) => value.transport.close());

    this.transports = [];
  }

  getByAlias(alias: string) {
    const object = this.transports.find((value) => value.alias === alias);

    if (!object) {
      throw new Error('ALIAS_NOT_FOUND');
    }

    return object?.transport;
  }
}
