import {
  Controller,
  HttpRequest,
  HttpResponse,
} from "../protocol/http.protocol";
import { Request, Response } from "express";

export const adapterRouter = (controller: Controller) => {
  return async (req: any, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body,
      params: req.params,
      query: req.query,
      headers: req.headers,
      logged: req.logged,
    };

    const httpResponse: HttpResponse = await controller.handle(httpRequest);
    res.status(httpResponse.statusCode).json(httpResponse.body);
  };
};
