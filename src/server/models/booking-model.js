// booking-model.js
import { DataTypes } from "sequelize";
import sequelize from "../connect_db/db.connect.js";
import { User } from "./user-model.js";

const Booking = sequelize.define("Booking", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  UserId: { // Добавляем поле UserId
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id',
    },
  },
  
});

// Связываем бронирование с пользователем и событием
Booking.belongsTo(User, {
  foreignKey: "UserId",
});

Booking.belongsTo(Event, {
  foreignKey: "EventId",
});

export { Booking };

import { Event } from "../models/event.js";
