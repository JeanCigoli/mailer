export type Base64Decode = (base: string) => Base64Decode.Result;

export namespace Base64Decode {
  export type Credentials = {
    alias: string;
    type: string;
    from: string;
    credential: {
      host: string;
      password: string;
      user: string;
      port: number;
    };
  };

  export type Result = Credentials;
}
