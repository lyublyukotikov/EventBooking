// db.connect.js
import { Sequelize } from "sequelize";
// импортируем переменную окружения
import { config } from 'dotenv';
config();

const sequelize = new Sequelize(
  process.env.DATABASE_URL,
  {
    define: {
      charset: 'utf8',
      collate: 'utf8_general_ci',
    },
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to PostgreSQL database");
  })
  .catch((error) => {
    console.log("Unable to connect to database:", error);
  });

export default sequelize;