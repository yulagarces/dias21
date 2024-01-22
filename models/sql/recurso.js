const {sequelize}= require("../../config/mysql")
const {DataTypes} = require("sequelize");

const Recurso = sequelize.define(
    "recurso",
    {
        recu_id:{
            type: DataTypes.INTEGER,
            allowNull:  false,
            primaryKey: true,
            autoIncrement: true,
        },
        recu_texto:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        recu_genero: {
            type:DataTypes.ENUM(["Femenino","Masculino", "LGBTQIA+", "No Aplica"]),
            allowNull: false,
        }, 
        recu_contenido:{
            type: DataTypes.STRING,
            allowNull: false,
        },    
        recu_tipo: {
            type:DataTypes.ENUM(["Frase","Lectura", "Video", "Link", "Tarea", "Sonido", "Mensaje"]),
            allowNull: false,
        }, 
        recu_lenguaje: {
            type:DataTypes.STRING,
            allowNull: false,
        }, 
        sub_id: {
            type:DataTypes.INTEGER,
            allowNull: false,
          
        },
    },
    {
        tableName:'recurso',
    },
    {
        timestamps: true,
    }
);

module.exports = Recurso;
    