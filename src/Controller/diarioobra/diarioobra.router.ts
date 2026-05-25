import { Router } from "express";
import { adapterRouter } from "../../adapter/router.adapter";
import { CreateDiarioObraController } from "./create/create-diarioobra.controller";
import { ListDiarioObraController } from "./list/list-diarioobra.controller";
import { FindDiarioObraController } from "./find/find-diarioobra.controller";
import { CreateColaboradoresUtilizadosController } from "../colaboradoresUtilizados/create/create-colaboradoresUtilizados.controller";

class DiarioObraRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routers();
  }

  private routers(): void {
    this.router.post(
      "/criarDiarioObra",
      adapterRouter(new CreateDiarioObraController()),
    );
    this.router.post(
      "/:idDiarioObra/atividades/:idAtividade/colaboradoresUtilizados",
      adapterRouter(new CreateColaboradoresUtilizadosController()),
    );
    this.router.get(
      "/listarDiarioObra",
      adapterRouter(new ListDiarioObraController()),
    );
    this.router.get("/:id", adapterRouter(new FindDiarioObraController()));
  }
}

export default new DiarioObraRouter().router;
