import { Router } from "express";
import { adapterRouter } from "../../adapter/router.adapter";
import { CreateMarcoController } from "./create/create-marco.controller";
import { ListMarcoController } from "./list/list-marco.controller";
import { FindMarcoController } from "./find/find-marco.controller";

class MarcoRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routers();
  }

  private routers(): void {
    this.router.post("/criarMarco", adapterRouter(new CreateMarcoController()));
    this.router.get("/listarMarco", adapterRouter(new ListMarcoController()));
    this.router.get("/:id", adapterRouter(new FindMarcoController()));
  }
}

export default new MarcoRouter().router;
