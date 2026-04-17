import { SequelizeHelper } from "./src/model/sequelize-helper";
import http from "http";

let server: http.Server | undefined;

(global as any).__server__ = {
  set: (s: http.Server) => {
    server = s;
  },
};

afterAll(async () => {
  try {
    if (SequelizeHelper?.sequelize) {
      await SequelizeHelper.sequelize.close();
    }
  } catch (error) {}

  try {
    if (server) {
      await new Promise<void>((resolve) => server?.close(() => resolve()));
    }
  } catch (error) {}

  jest.clearAllTimers();
  jest.useRealTimers();
  jest.restoreAllMocks();
});
