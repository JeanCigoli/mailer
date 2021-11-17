# MAILER - API

![Imagem de template](./docs/img/mailer.png)

Essa API foi criada para ajudar no fluxo de envios de e-mails. Foi pensado para cada envio ser completamente moldado de acordo com a autenticação que foi usada nela.

Os templates são criados para se ajustar a cores, imagens e conteúdo.

## Como funciona?

Quando a API inicia ela abre junto de suas conexões todas as credenciar de SMTP, assim mantendo as instâncias abertas para evitar muito consumo de recursos.

Existe uma end-point (padrão RESTFUL) onde é consumido passando o token de acesso no header, assim sendo possível pegar de qual empresa o template será moldado, e no body as informações do template.

Ao enviar os dados é adicionado em uma fila de envio (utilizando o RabbitMq) e respondido para o usuário que o envio logo será efetuado.

Ao cair na fila a API possui um listener onde é consumido os dados e assim realizando o envio através do provedor de SMTP. É registrado no mongoDb todos os envios que o seu resultado para análise.

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
