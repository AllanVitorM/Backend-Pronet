import { HttpResponse } from "../protocol/http.protocol";

export const forbidden = (): HttpResponse => {
  return {
    statusCode: 403,
    body: {
      message: 'Acesso negado. Você não tem permissão para acessar este recurso. Caso ache que isso é um erro, entre em contato com o suporte.'
    }
  }
}
