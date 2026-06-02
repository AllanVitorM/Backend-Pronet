import { Router } from "express";
import { adapterRouter } from "../../adapter/router.adapter";
import { CreatePerfisColaboradoresController } from "./create/create-perfisColaboradores.controller";
import { ListPerfisColaboradoresController } from "./list/list-perfisColaboradores.controller";
import { FindPerfisColaboradoresController } from "./find/find-perfisColaboradores.controller";


class PerfisColaboradoresRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routers();
  }

  private routers(): void {
    this.router.post("/criarColaborador", adapterRouter(new CreatePerfisColaboradoresController()));
    this.router.get("/listarColaborador", adapterRouter(new ListPerfisColaboradoresController()));
    this.router.get("/:id", adapterRouter(new FindPerfisColaboradoresController()));
  }
}

export default new PerfisColaboradoresRouter().router;
