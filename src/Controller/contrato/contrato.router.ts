import { Router } from "express";
import { adapterRouter } from "../../adapter/router.adapter";
import { CreateContratoController } from "./create/create-contrato.controller";

class ContratoRouter{
  public router: Router;

  constructor(){
  this.router = Router();
  this.routers()
}

private routers(): void{
  this.router.post("/criarContrato", adapterRouter(new CreateContratoController()));
}
}

export default new ContratoRouter().router;
