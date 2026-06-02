import { Router } from "express";
import { adapterRouter } from "../../adapter/router.adapter";
import { CreatePerfisResponsaveisController } from "./create/create-perfisResponsaveis.controller";
import { ListPerfisResponsaveisController } from "./list/list-perfisResponsaveis.controller";
import { FindPerfisResponsaveisController } from "./find/find-perfisResponsaveis.controller";

class PerfisResponsaveisRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routers();
  }

  private routers(): void {
    this.router.post("/criarResposaveis", adapterRouter(new CreatePerfisResponsaveisController()));
    this.router.get("/listarResponsaveis", adapterRouter(new ListPerfisResponsaveisController()));
    this.router.get("/:id", adapterRouter(new FindPerfisResponsaveisController()));
  }
}

export default new PerfisResponsaveisRouter().router;
