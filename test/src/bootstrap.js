import express from "express";
import { connectionDB } from "./DB/db.connection.js";
import { router } from "./modules/user/user.controllers.js";

export const bootstrap = async () => {
  const app = express();
  const PORT = 3000;
  app.use(express.json());
  await connectionDB();
  app.use("/user",router)
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
