import { HttpResponse } from "../protocol/http.protocol";

export interface SuccessData {
  message?: string;
  data?: any;
  nPages?: number;
  total?: number;
}

export const success = (data?: SuccessData): HttpResponse => {
  return {
    statusCode: 200,
    body: {
      message: data?.message,
      data: data?.data,
      nPages: data?.nPages,
      total: data?.total,
    },
  };
};
