import { Router } from "express";
import { adapterRouter } from "../../adapter/router.adapter";
import { CreateMaterialUtilizadoController } from "./create/create-materiaisUtilizados.controller";
import { ListMaterialUtilizadoController } from "./list/list-materiaisUtilizado.controller";
import { FindMateriaisUtilizados } from "./find/find-MateriaisUtilizados.controller";

class MateriaisUtilizadosRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routers();
  }

  private routers(): void {

}

export default new MateriaisUtilizadosRouter().router;
