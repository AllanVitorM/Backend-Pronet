import { Router } from "express";
import { adapterRouter } from "../../adapter/router.adapter";
import { CreateUsuarioController } from "./create/create-usuario.controller";

class UsuariosRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routers();
  }

  private routers(): void {
    this.router.post("/criarUsuario", adapterRouter(new CreateUsuarioController()));
  }
}

export default new UsuariosRouter().router;