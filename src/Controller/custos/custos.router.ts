import { Router } from "express";
import { adapterRouter } from "../../adapter/router.adapter";
import { FindCustosProjetoController } from "./find/find-custosProjeto.controller";
import { FindCustosAtividadeController } from "./findAtividades/find-custosAtividades.controller";

class CustosRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routers();
  }

  private routers(): void {
    this.router.get(
      "/projeto/:idProjeto",
      adapterRouter(new FindCustosProjetoController()),
    );
    this.router.get(
      "/atividade/:idAtividade",
      adapterRouter(new FindCustosAtividadeController()),
    );
  }
}

export default new CustosRouter().router;
