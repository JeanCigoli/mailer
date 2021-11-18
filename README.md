# MAILER - API

![Imagem de template](./docs/img/mailer.png)

A API foi criada no intuito de ajudar no fluxo de envios de e-mails. Foi pensado para cada envio ser completamente moldado de acordo com a autenticação que foi usada nela.

Os templates são criados para ajustar as cores, imagens e conteúdo que nele possui, assim criando a identidade visual de cada empresa no envio.

## Como funciona?

Quando a API é instanciada, é aberto junto de suas conexões todas as credenciais de envio pelo SMTP, assim mantendo o tráfego aberto para evitar muito consumo de recursos.

Existe uma end-point (RESTFUL) que é a porta de entrada, ao usa-lá terá que passar o token de acesso no header, assim identificamos de qual empresa o template será montado, e no body as informações de destino.

Ao recebermos os dados é adicionado em uma fila de envio (utilizando o RabbitMq) para o processamento ser de forma assíncrona, e neste momento é respondido para o usuário que o envio logo será efetuado.

Temos um ouvinte que fica lendo a fila e consumido os dados, com isso realizando o envio através do provedor de SMTP. Cada envio possui seu registro de logo no MongoDB com o seu resultado de transporte para análise.

### End-point de envio

```txt
URL: {{host}}/mailer/v1/shipments
```

### HEADER

```txt
Authorization = {{token}}
```

### BODY

```json
{
  "to": [
    {
      "email": "jeancigoli30@gmail.com",
      "variables": {
        "name": "Jean Cigoli"
      }
    }
  ],
  "subject": "AVISO - email a caminho",
  "template": "mailer"
}
```

## Bibliotecas e ferramentas

- NPM
- Typescript
- Git
- MongoDB
- Express
- RabbitMq
- Sql Server
- Eslint
- NodeMailer
- Handlebars

## Metodologias e Designs

- Clean Architecture
- Conventional Commits
- Modular Design
- Use Cases

---

Jean Cigoli - 16/11/2021
