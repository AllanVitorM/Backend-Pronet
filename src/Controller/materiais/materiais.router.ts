import { Router } from "express";
import { adapterRouter } from "../../adapter/router.adapter";
import { CreateMaterialController } from "./create/create-materiais.controller";

class MateriaisRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routers();
  }

  private routers(): void {
    this.router.post("/criarMaterial", adapterRouter(new CreateMaterialController()));
  }
}

export default new MateriaisRouter().router;