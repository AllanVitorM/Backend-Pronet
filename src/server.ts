import { SequelizeHelper } from "./models/sequelize-helper";
import app from "./app";

const API_URL = process.env.PORT

SequelizeHelper.connect()
  .then(() => {
    app.listen(API_URL || 7000, () => {
      console.log(`Server is running on port ${process.env.PORT || 7000}`);

      if(API_URL) {
        setInterval(() => {
          async () => {
            try {
              const response = await fetch(`${API_URL}/ping`);
              console.log("Servidor respondendo")
            } catch (error) {
              console.error("Erro no servidor")
            }
          }
        }, 5 * 60 * 1000);
      }
    });
  })
  .catch((erro) => console.error("Unable to connect to the database:", erro));
