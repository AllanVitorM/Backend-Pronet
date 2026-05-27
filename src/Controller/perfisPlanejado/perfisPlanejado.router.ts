import { Router } from "express";
import { adapterRouter } from "../../adapter/router.adapter";
import { CreatePerfisPlanejadoController } from "./create/create-perfisPlanejado.controller";

class PerfisPlanejadoRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routers();
  }

  private routers(): void {
    this.router.post("/criarPerfilPlanejado", adapterRouter(new CreatePerfisPlanejadoController()));
  }
}

export default new PerfisPlanejadoRouter().router;