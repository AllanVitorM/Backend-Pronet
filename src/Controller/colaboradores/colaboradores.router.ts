import { Router } from "express";
import { adapterRouter } from "../../adapter/router.adapter";

import { CreateColaboradoresController } from "./create/create-colaboradores.controller";
import { ListColaboradoresController } from "./list/list-colaboradores.controller";
import { FindColaboradoresController } from "./find/find-colaboradores.controller";

class ColaboradoresRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routers();
  }

  private routers(): void {
    this.router.post(
      "/criarColaborador",
      adapterRouter(new CreateColaboradoresController()),
    );

    this.router.get(
      "/listarColaboradores",
      adapterRouter(new ListColaboradoresController()),
    );

    this.router.get(
      "/:id",
      adapterRouter(new FindColaboradoresController()),
    );
  }
}

export default new ColaboradoresRouter().router;
