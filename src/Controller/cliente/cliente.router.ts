import { Router } from "express";
import { adapterRouter } from "../../adapter/router.adapter";
import { CreateClienteController } from "./create/create-cliente.controller";
import { FindClienteController } from "./find/find-cliente.controller";
import { ListClienteController } from "./list/list-cliente.controller";

class ClienteRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routers();
  }

  private routers(): void {
    this.router.post("/criarCliente", adapterRouter(new CreateClienteController()));
    this.router.get("/:id", adapterRouter(new FindClienteController()));
    this.router.get("/", adapterRouter(new ListClienteController()));
  }
}

export default new ClienteRouter().router;