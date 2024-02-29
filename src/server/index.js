/* eslint-env node */
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import sequelize from "../server/connect_db/db.connect.js"; // Импортируем экземпляр sequelize

import router from "../../src/server/router/index.js";
//импортируем переменную окружения 
import { config } from 'dotenv';
config();
//импортируем middleware для обработки ошибок 
import errorMiddleware from "./middlewares/error-middleware.js";
const PORT = process.env.PORT || 5000;
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors({
  credentials: true,
  origin: process.env.CORS_ORIGIN
}));
app.use("/api", router);
app.use(errorMiddleware);


// Синхронизируем модели с базой данных
async function syncDatabase() {
  try {
    await sequelize.sync({ alter: true });
    console.log("Database synchronized");
  } catch (error) {
    console.error("Error syncing database:", error);
  }
}

// Вызываем функцию синхронизации перед запуском сервера
syncDatabase();





// Порт на котором работает сервер
const start = async () => {
  try {
    app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};


start();

