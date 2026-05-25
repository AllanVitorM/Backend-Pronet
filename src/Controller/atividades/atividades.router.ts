import { Router } from "express";
import { adapterRouter } from "../../adapter/router.adapter";
import { CreateAtividadesController } from "./create/create-atividades.controller";
import { ListAtividadesController } from "./list/list-atividades.controller";
import { FindAtividadesController } from "./find/find-atividades.controller";
import { CreateMaterialUtilizadoController } from "../materiais-utilizados/create/create-materiaisUtilizados.controller";
import { ListMaterialUtilizadoController } from "../materiais-utilizados/list/list-materiaisUtilizados.controller";
import { FindMateriaisUtilizados } from "../materiais-utilizados/find/find-materiaisUtilizados.controller";
import { CreateMateriaisPlanejadoController } from "../materiais-planejado/create/create.materiaisPlanejado.controller";
import { ListMateriaisPlanejadoController } from "../materiais-planejado/list/list-materiaisPlanejado.controller";
import { FindMateriaisPlanejadoController } from "../materiais-planejado/find/find-materiaisPlanejado.controller";
class AtividadesRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routers();
  }

  private routers(): void {
    this.router.post(
      "/criarAtividade",
      adapterRouter(new CreateAtividadesController()),
    );
    this.router.get(
      "/listarAtividades",
      adapterRouter(new ListAtividadesController()),
    );

    this.router.post(
      "/:idAtividade/materialUtilizados",
      adapterRouter(new CreateMaterialUtilizadoController()),
    );

    this.router.post(
      "/:idAtividade/materiaisPlanejado",
      adapterRouter(new CreateMateriaisPlanejadoController()),
    );

    this.router.get(
      "/:idAtividade/mateiraisUtilizados",
      adapterRouter(new ListMaterialUtilizadoController()),
    );

    this.router.get(
      "/:idAtividade/materiaisPlanejado",
      adapterRouter(new ListMateriaisPlanejadoController()),
    );

    this.router.get("/:id", adapterRouter(new FindAtividadesController()));

    this.router.get(
      "/materiaisPlanejado/:id",
      adapterRouter(new FindMateriaisPlanejadoController()),
    );

    this.router.get(
      "/materiaisUtilizados/:id",
      adapterRouter(new FindMateriaisUtilizados()),
    );
  }
}

export default new AtividadesRouter().router;
