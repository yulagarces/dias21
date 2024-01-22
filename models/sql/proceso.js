const {sequelize}= require("../../config/mysql")
const {DataTypes} = require("sequelize");

const Proceso = sequelize.define(
    "proceso",
    {
        pro_id:{
            type: DataTypes.INTEGER,
            allowNull:  false,
            primaryKey: true,
            autoIncrement: true,
        },
        pro_fecha_inicio:{
            type: DataTypes.DATE,
            allowNull: false,
        },
        pro_fecha_fin: {
            type:DataTypes.DATE,
            allowNull: false,
        },
        pro_fecha_ui: {
            type:DataTypes.DATE,
            allowNull: false,
        },
        pro_volumen_g: {
            type:DataTypes.STRING,
            allowNull: false,
        },
        pro_volumen_c: {
            type:DataTypes.STRING,
            allowNull: false,
        },
        pro_dia: {
            type:DataTypes.INTEGER,
            allowNull: false,
        },
        pro_imagen_fondo: {
            type:DataTypes.STRING,
            allowNull: false,
        },
        sub_id: {
            type:DataTypes.INTEGER,
            allowNull: false,
        },  
        usu_id: {
            type:DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
        tableName:'proceso',
    },
    {
        timestamps: true,
    }
);

module.exports = Proceso;
    