import { Router } from "express";
import { adapterRouter } from "../../adapter/router.adapter";
import { CreateProjetoController } from "./create/create-projetos.controller";

class ContratoRouter{
  public router: Router;

  constructor(){
  this.router = Router();
  this.routers()
}

private routers(): void{
  this.router.post("/criarProjetos", adapterRouter(new CreateProjetoController()));
}
}

export default new ContratoRouter().router;
