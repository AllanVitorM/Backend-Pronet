import express, {json} from "express";
import cors from "cors";
import contratoRouter from "./Controller/contrato/contrato.router";

class Application {
  public application: express.Application;

  constructor(){
    this.application = express();
    this.middlewares();
    this.routers();
  }

  private middlewares(){
    this.application.use(json());
    this.application.use(cors());
  }

  private routers(){
    this.application.use("/contrato/", contratoRouter)
  }
}

export default new Application().application;
