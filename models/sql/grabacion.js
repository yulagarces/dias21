const {sequelize}= require("../../config/mysql")
const {DataTypes} = require("sequelize");

const Grabacion = sequelize.define(
    "grabacion",
    {
        gra_id:{
            type: DataTypes.INTEGER,
            allowNull:  false,
            primaryKey: true,
            autoIncrement: true,
        },
        gra_audio:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        gra_fecha: {
            type:DataTypes.DATE,
            allowNull: false,
        },
        pro_id: {
            type:DataTypes.INTEGER,
            allowNull: false,
        }      
       
    },
    {
        tableName:'grabacion',
    },
    {
        timestamps: true,
    }
);

module.exports = Grabacion;
    