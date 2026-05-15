import { Router } from "express";
import { adapterRouter } from "../../adapter/router.adapter";
import { CreateProjetoController } from "./create/create-projetos.controller";
import { ListProjetosController } from "./list/list-projetos.controller";
import { FindProjetosController } from "./find/find-projetos.controller";

class ContratoRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routers();
  }

  private routers(): void {
    this.router.post(
      "/criarProjetos",
      adapterRouter(new CreateProjetoController()),
    );
    this.router.get(
      "/listarProjetos",
      adapterRouter(new ListProjetosController()),
    );
    this.router.get("/:id", adapterRouter(new FindProjetosController()));
  }
}

export default new ContratoRouter().router;
