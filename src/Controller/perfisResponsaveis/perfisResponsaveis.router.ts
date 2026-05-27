import { Router } from "express";
import { adapterRouter } from "../../adapter/router.adapter";
import { CreatePerfisResponsaveisController } from "./create/create-perfisResponsaveis.controller";

class PerfisResponsaveisRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routers();
  }

  private routers(): void {
    this.router.post("/criarPerfilResponsavel", adapterRouter(new CreatePerfisResponsaveisController()));
  }
}

export default new PerfisResponsaveisRouter().router;