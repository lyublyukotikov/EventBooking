// photo-model.js
import { DataTypes } from "sequelize";
import sequelize from "../connect_db/db.connect.js";

import {Album }from "../models/album.js"
const Photo = sequelize.define('Photo', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  albumId: {
    type: DataTypes.INTEGER,
    references: {
      model: Album,
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
  tableName: 'photo',
});
// Ассоциация многие ко многим с Album
Photo.belongsToMany(Album, { through: "PhotoAlbum", foreignKey: "photoId" });
export { Photo };