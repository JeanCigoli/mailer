type Destination = {
  correlationId: string | number;
  destination: string;
};

type Interactive = {
  messageInteractiveType: 'REPLY_BUTTON' | 'LIST';
  header: {
    text?: string;
    image?: {
      type: string;
      url: string;
    };
    video?: {
      type: string;
      url: string;
    };
    document?: {
      type: string;
      url: string;
    };
    location?: {
      geoPoint: string;
      name: string;
      address: string;
    };
  };
  body: {
    text: string;
  };
  footer?: {
    text: string;
  };
  alternativeText: string;
};

type Button = {
  reply: {
    title: string | number;
    payload: string | number;
  };
};

type ReplyButton = {
  replyButtonAction: {
    buttons: Button[];
  };
};

type Session = {
  identifier: string;
  title: string;
  description: string;
};

type ListAction = {
  listAction: {
    button: string;
    sections: [
      {
        rows: Session[];
      },
    ];
  };
};

export type ButtonWhats = {
  destinations: Destination[];
  message: {
    interactive: Interactive & ReplyButton;
  };
};

export type ListWhats = {
  destinations: Destination[];
  message: {
    interactive: Interactive & ListAction;
  };
};

export type MessageDefault = {
  destinations: Destination[];
  message: {
    messageText: string;
  };
};
