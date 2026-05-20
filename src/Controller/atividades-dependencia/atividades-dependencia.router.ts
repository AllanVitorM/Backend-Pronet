import { Router } from "express";
import { adapterRouter } from "../../adapter/router.adapter";
import { CreateAtividadesDependenciaController } from "./create/create-atividades-dependencia.controller";
import { FindAtividadesDependenciaController } from "./find/find-atividades-dependencia.controller";
import { ListAtividadesDependenciaController } from "./list/list-atividades-dependencia.controller";

class AtividadesDependenciaRouter {
  public router: Router;
  constructor() {
    this.router = Router();
    this.routers();
  }
  private routers(): void {
    this.router.post("/criarDependencia", adapterRouter(new CreateAtividadesDependenciaController()));
    this.router.get("/:id", adapterRouter(new FindAtividadesDependenciaController()));
    this.router.get("/", adapterRouter(new ListAtividadesDependenciaController()));
  }
}

export default new AtividadesDependenciaRouter().router;