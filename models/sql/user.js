const {sequelize}= require("../../config/mysql")
const {DataTypes} = require("sequelize");

const User = sequelize.define(
    "usuario",
    {
        usu_dni:{
            type: DataTypes.INTEGER,
            allowNull:  false,
            primaryKey: true,
            autoIncrement: true,
        },
        usu_documento:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        usu_correo: {
            type:DataTypes.STRING,
            allowNull: false,
        },
        usu_genero: {
            type:DataTypes.ENUM(["Femenino","Masculino","LGBTQIA+"]),
            allowNull: false,
        },
        usu_contrasenia: {
            type:DataTypes.STRING,
            allowNull: false,
            select: false,
        },  
        usu_edad: {
            type:DataTypes.INTEGER,
            allowNull: false,
        },
        usu_foto: {
            type:DataTypes.STRING,
            allowNull: false,
        },
        usu_nombre: {
            type:DataTypes.STRING,
            allowNull: false,
        }

    },
    {
        timestamps: true,
    }
);

module.exports = User;
    