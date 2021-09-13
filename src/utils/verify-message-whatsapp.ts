export type VerifyMessage = {
  headerMessage: string;
  bodyMessage: string;
  buttons: Array<[number, string]>;
};

export const verifyMessages = (
  first: string,
  second: string | null,
): VerifyMessage => {
  if (!second) {
    const [text, values] = first.split('|||');

    return {
      headerMessage: 'Selecione uma opção abaixo',
      bodyMessage: text,
      buttons: values ? JSON.parse(values) : [],
    };
  }

  const [text, values] = second.split('|||');

  return {
    headerMessage: first,
    bodyMessage: text,
    buttons: values ? JSON.parse(values) : [],
  };
};
