import express, {json} from "express";
import cors from "cors";
import contratoRouter from "./Controller/contrato/contrato.router";
import projetosRouter from "./Controller/projetos/projetos.router";
import clienteRouter from './Controller/cliente/cliente.router';
import atividadeRouter from "./Controller/atividade/atividade.router";
import atividadesDependenciaRouter from "./Controller/atividades-dependencia/atividades-dependencia.router";

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
    this.application.use("/projetos/", projetosRouter)
    this.application.use("/cliente/", clienteRouter)
    this.application.use("/atividade/", atividadeRouter)
    this.application.use("/atividades-dependencia/", atividadesDependenciaRouter)
  }
}

export default new Application().application;
