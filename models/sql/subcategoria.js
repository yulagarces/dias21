const {sequelize}= require("../../config/mysql")
const {DataTypes} = require("sequelize");
const {categoriaModel} = require("./categoria");

const Subcategoria = sequelize.define(
    "subcategoria",
    {
        sub_id:{
            type: DataTypes.INTEGER,
            allowNull:  false,
            primaryKey: true,
            autoIncrement: true,
        },
        sub_nombre:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        sub_imagen_claro: {
            type:DataTypes.STRING,
            allowNull: false,
        },
        sub_imagen_oscuro: {
            type:DataTypes.STRING,
            allowNull: false,
        },
        cat_id_f: {
            type:DataTypes.INTEGER,
            allowNull: false,
        },
        sub_color: {
            type:DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        timestamps: true,
    }
);

module.exports = Subcategoria;
    