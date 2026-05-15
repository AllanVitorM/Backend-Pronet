import { Router } from "express";
import { adapterRouter } from "../../adapter/router.adapter";
import { CreateContratoController } from "./create/create-contrato.controller";
import { ListContratoController } from "./list/list-contrato.controller";
import { FindContratoController } from "./find/find-contrato.controller";

class ContratoRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routers();
  }

  private routers(): void {
    this.router.post(
      "/criarContrato",
      adapterRouter(new CreateContratoController()),
    );
    this.router.get(
      "/listarContratos",
      adapterRouter(new ListContratoController()),
    );
    this.router.get("/:id", adapterRouter(new FindContratoController()));
  }
}

export default new ContratoRouter().router;
