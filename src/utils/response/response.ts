export const ok = (message: string, payload: object) => {
  return {
    statusCode: 200,
    body: {
      message,
      payload,
      error: [],
    },
  };
};

export const created = (message: string, payload: object) => {
  return {
    statusCode: 201,
    body: {
      message,
      payload,
      error: [],
    },
  };
};

export const serverError = (error: any, message?: string) => {
  return {
    statusCode: 500,
    body: {
      message: message
        ? message
        : 'Ops, parece que ocorreu um erro dentro dos nossos servidores',
      payload: {},
      error: [{ message: 'Ocorreu um erro em nosso servidores' }],
    },
  };
};

export const conflict = (message: string, error?: any) => {
  return {
    statusCode: 409,
    body: {
      message,
      payload: {},
      error,
    },
  };
};

export const badRequest = (error?: any) => {
  return {
    statusCode: 400,
    body: {
      message: 'Ops, ocorreram alguns erros de validações',
      payload: {},
      error,
    },
  };
};

export const unauthorized = (error?: any) => {
  return {
    statusCode: 401,
    body: {
      message: 'Ops, você não tem permissão para acessar esse conteúdo',
      payload: {},
      error,
    },
  };
};

export const unprocessableEntity = (message: string, error?: any) => {
  return {
    statusCode: 422,
    body: {
      message: message,
      payload: {},
      error,
    },
  };
};

export const notFound = (message: string, error?: any) => {
  return {
    statusCode: 404,
    body: {
      message,
      payload: {},
      error,
    },
  };
};
