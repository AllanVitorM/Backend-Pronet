import { HttpResponse } from "../protocol/http.protocol";

export const badRequest = (message: string): HttpResponse => {
  return {
    statusCode: 400,
    body: {
      message,
    },
  };
};
