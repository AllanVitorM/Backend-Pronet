import express, {json} from "express";
import cors from "cors";
import contratoRouter from "./Controller/contrato/contrato.router";
import projetosRouter from "./Controller/projetos/projetos.router";
import usuariosRouter from "./Controller/usuarios/usuarios.router";
import materiaisRouter from "./Controller/materiais/materiais.router";
import clienteRouter from './Controller/cliente/cliente.router';
import atividadesRouter from "./Controller/atividade/atividade.router";
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
    this.application.use("/usuarios/", usuariosRouter)
    this.application.use("/materiais/", materiaisRouter)
    this.application.use("/atividades/", atividadesRouter)
    this.application.use("/cliente/", clienteRouter)
    this.application.use("/atividades-dependencia/", atividadesDependenciaRouter)

  }
}

export default new Application().application;
