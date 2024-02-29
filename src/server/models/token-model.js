// token-model.js
import { DataTypes } from "sequelize";
import sequelize from "../connect_db/db.connect.js";
import { User } from "../models/user-model.js";

const Token = sequelize.define('Token', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  refresh_token: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'token', // Указываем желаемое имя таблицы
});

export { Token };
