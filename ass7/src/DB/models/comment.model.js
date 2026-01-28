import { DataTypes } from "sequelize";
import { sequelize } from "../db.connection.js";
import {User} from "./user.model.js";
import {Post} from "./post.model.js";

export const Comment = sequelize.define("Comment", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  
 content:{
    type: DataTypes.TEXT,
 },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,   // table being referenced
      key: "id"
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  },
    postId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Post,   // table being referenced
      key: "id"
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});
