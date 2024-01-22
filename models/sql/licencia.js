const {sequelize}= require("../../config/mysql")
const {DataTypes} = require("sequelize");

const Licencia = sequelize.define(
    "licencia",
    {
        lic_id:{
            type: DataTypes.INTEGER,
            allowNull:  false,
            primaryKey: true,
            autoIncrement: true,
        },
        lic_fecha_i:{
            type: DataTypes.DATE,
            allowNull: false,
        },
        lic_fecha_f: {
            type:DataTypes.DATE,
            allowNull: false,
        },
        lic_valor: {
            type:DataTypes.DOUBLE,
            allowNull: false,
        },

        lic_estado_usuario: {
            type:DataTypes.ENUM(["Activo","Inactivo"]),
            allowNull: false,
        },
        lic_tipo: {
            type:DataTypes.ENUM(["Mensual","Trimestral", "Semestral", "Proceso", "Prueba"]),
            allowNull: false,
        },
        usu_dni: {
            type:DataTypes.INTEGER,
            allowNull: false,
        },  
        payment_id: {
            type:DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = Licencia;
    