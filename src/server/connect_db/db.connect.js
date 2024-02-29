// db.connect.js
import { Sequelize } from "sequelize";

const sequelize = new Sequelize('ovoshebaza_db', 'postgres', '12345678', {
  host: 'localhost',
  dialect: 'postgres',
  define: {
    charset: 'utf8',
    collate: 'utf8_general_ci',
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to PosgreSQL database");
  })
  .catch((error) => {
    console.log("Unable to connect to database:", error);
  });

export default sequelize;