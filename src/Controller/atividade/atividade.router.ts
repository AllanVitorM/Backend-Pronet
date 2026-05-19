import { Router } from "express";
import { adapterRouter } from "../../adapter/router.adapter";
import { CreateAtividadeController } from "./create/create-atividade.controller";
import { FindAtividadeController } from "./find/find-atividade.controller";
import { ListAtividadeController } from "./list/list-atividade.controller";

class AtividadeRouter {
  public router: Router;
  constructor() {
    this.router = Router();
    this.routers();
  }
  private routers(): void {
    this.router.post("/criarAtividade", adapterRouter(new CreateAtividadeController()));
    this.router.get("/:id", adapterRouter(new FindAtividadeController()));
    this.router.get("/", adapterRouter(new ListAtividadeController()));
  }
}

export default new AtividadeRouter().router;