import { Router } from "express";
import { adapterRouter } from "../../adapter/router.adapter";
import { CreateDiarioObraController } from "./create/create-diarioobra.controller";
import { ListDiarioObraController } from "./list/list-diarioobra.controller";
import { FindDiarioObraController } from "./find/find-diarioobra.controller";

class DiarioObraRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routers();
  }

  private routers(): void {
    this.router.post(
      "/criarContrato",
      adapterRouter(new CreateDiarioObraController()),
    );
    this.router.get(
      "/listarContratos",
      adapterRouter(new ListDiarioObraController),
    );
    this.router.get("/:id", adapterRouter(new FindDiarioObraController()));
  }
}

export default new DiarioObraRouter().router;
