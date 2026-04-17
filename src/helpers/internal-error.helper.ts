import { HttpResponse } from "../protocol/http.protocol";

export const InternalError = (message?: string): HttpResponse => {
  return {
    statusCode: 500,
    body: {
      message: message
        ? message
        : "Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.",
    },
  };
};
