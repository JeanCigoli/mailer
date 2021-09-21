import { Source } from '../enum/source';

export const notFoundMessage = (source: Source) => {
  const returnsMessages = {
    6: 'messagenotfound.wav',
    7: 'Não foi possível identificar sua mensagem, poderia repetir?',
    8: 'Não foi possível identificar sua mensagem, poderia repetir?',
  };

  return returnsMessages[source];
};
