import express, { json } from "express";
import cors from "cors";
import contratoRouter from "./Controller/contrato/contrato.router";
import projetosRouter from "./Controller/projetos/projetos.router";
import usuariosRouter from "./Controller/usuarios/usuarios.router";
import materiaisRouter from "./Controller/materiais/materiais.router";
import clienteRouter from "./Controller/cliente/cliente.router";
import atividadesRouter from "./Controller/atividades/atividades.router";
import atividadesDependenciaRouter from "./Controller/atividades-dependencia/atividades-dependencia.router";
import marcoRouter from "./Controller/marco/marco.router";
import colaboradoresRouter from "./Controller/colaboradores/colaboradores.router";
import custosRouter from "./Controller/custos/custos.router";
import perfisResponsaveisRouter from "./Controller/perfisResponsaveis/perfisResponsaveis.router";
import perfisColaboradoresRouter from "./Controller/perfisColaboradores/perfisColaboradores.router";

class Application {
  public application: express.Application;

  constructor() {
    this.application = express();
    this.middlewares();
    this.routers();
  }

  private middlewares() {
    this.application.use(json());
    this.application.use(cors());
  }

  private routers() {

    this.application.get("/ping" , (req, res) => {
      return res.status(200).json({
        status: "ok",
        message: "pong",
        timestamp: new Date().toISOString()
      })
    })
    this.application.use("/contrato/", contratoRouter);
    this.application.use("/projetos/", projetosRouter);
    this.application.use("/usuarios/", usuariosRouter);
    this.application.use("/materiais/", materiaisRouter);
    this.application.use("/atividades/", atividadesRouter);
    this.application.use("/cliente/", clienteRouter);
    this.application.use(
      "/atividades-dependencia/",
      atividadesDependenciaRouter,
    );
    this.application.use("/marco/", marcoRouter);
    this.application.use("/colaboradores/", colaboradoresRouter);
    this.application.use("/custos/", custosRouter);
    this.application.use("/perfisResponsaveis", perfisResponsaveisRouter);
    this.application.use("/perfilColaboradores", perfisColaboradoresRouter)
  }
}

export default new Application().application;
