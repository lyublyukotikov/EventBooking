// event-model.js
import { DataTypes } from "sequelize";
import sequelize from "../connect_db/db.connect.js";
import {User} from "./user-model.js"
const Event = sequelize.define('Event', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  eventName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  organizerFirstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  organizerLastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  eventAddress: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  eventDescription: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  firstProbableDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  lastProbableDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  eventStartTime: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  eventEndTime: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  convenientDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  UserId: { // Добавляем поле UserId
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id',
    },
  },
  // Добавляем поле email
  userEmail: {
    type: DataTypes.STRING,
    allowNull: true, // Позволяет хранить значение null, если у пользователя нет электронной почты
  },
});
// Связываем событие с пользователем

Event.belongsTo(User, {
  foreignKey: 'UserId', // Укажите имя внешнего ключа, по которому будет производиться связь
});


export { Event };
