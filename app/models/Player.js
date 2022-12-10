import { DataTypes } from "sequelize";
import Game from "./Game.js";
import bcrypt from "bcrypt";
import db from "../config/db.js";

const Player = db.define(
  "tb_players",
  //columnas de las que llevara nuestra tabla
  {
    correo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nombres: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    paterno: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    materno: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fecha_nacimiento: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    gamertag: {
      type: DataTypes.STRING,
      unique: true,
    },
    avatar: {
      type: DataTypes.STRING,
      max: 750
    }
  },
  {
    hooks: {
      // son como triggers de sequelize
      beforeCreate: async function (player) {
        const salt = await bcrypt.genSalt(10); //
        player.password = await bcrypt.hash(player.password, salt);
      },
      beforeUpdate: async function (player) {
        const salt = await bcrypt.genSalt(10); //
        player.password = await bcrypt.hash(player.password, salt);
      },
    },
  }
); // es como si estuvieramos creando las tablas remotamente

Player.prototype.verifyPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};


export default Player;
