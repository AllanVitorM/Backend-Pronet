import { SequelizeHelper } from "./models/sequelize-helper";
import app from "./app";

SequelizeHelper.connect()
  .then(() => {
    app.listen(process.env.PORT || 7000, () => {
      console.log(`Server is running on port ${process.env.PORT || 7000}`);
    });
  })
  .catch((erro) => console.error("Unable to connect to the database:", erro));
