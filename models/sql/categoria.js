const {sequelize}= require("../../config/mysql")
const {DataTypes} = require("sequelize");

const Categoria = sequelize.define(
    "categoria",
    {
        cat_id:{
            type: DataTypes.INTEGER,
            allowNull:  false,
            primaryKey: true,
            autoIncrement: true,
        },
        cat_nombre:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        cat_imagen_claro: {
            type:DataTypes.STRING,
            allowNull: false,
        },
        cat_imagen_oscuro: {
            type:DataTypes.STRING,
            allowNull: false,
        },
        cat_descripcion: {
            type:DataTypes.STRING,
            allowNull: false,
        },
        cat_titulo_largo: {
            type:DataTypes.STRING,
            allowNull: false,
        },
        cat_color: {
            type:DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        timestamps: true,
    }
);

//Categoria.hasMany(Subcategoria);
module.exports = Categoria;
    