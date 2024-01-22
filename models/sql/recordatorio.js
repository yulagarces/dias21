const {sequelize}= require("../../config/mysql")
const {DataTypes} = require("sequelize");

const Recordatorio = sequelize.define(
    "recordatorio",
    {
        rec_id:{
            type: DataTypes.INTEGER,
            allowNull:  false,
            primaryKey: true,
            autoIncrement: true,
        },
        rec_fecha_i:{
            type: DataTypes.DATE,
            allowNull: false,
        },
        rec_fecha_f: {
            type:DataTypes.DATE,
            allowNull: false,
        },
        rec_hora: {
            type:DataTypes.TIME,
            allowNull: false,
        },

        rec_tipo: {
            type:DataTypes.ENUM(["Alarma","Recordatorio"]),
            allowNull: false,
        },      
        pro_id: {
            type:DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        tableName:'recordatorio',
    },
    {
        timestamps: true,
    }
);

module.exports = Recordatorio;
    