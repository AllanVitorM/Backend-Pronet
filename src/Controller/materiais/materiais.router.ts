import { Router } from "express";
import { adapterRouter } from "../../adapter/router.adapter";
import { CreateMaterialController } from "./create/create-materiais.controller";
import { ListMateriaisController } from "./list/list-materiais.controller";
import { FindMateriaisController } from "./find/find-materiais.controller";

class MateriaisRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routers();
  }

  private routers(): void {
    this.router.post("/criarMaterial", adapterRouter(new CreateMaterialController()));
    this.router.get("/listarMateriais", adapterRouter(new ListMateriaisController()));
    this.router.get("/:id", adapterRouter(new FindMateriaisController()));
  }
}

export default new MateriaisRouter().router;
