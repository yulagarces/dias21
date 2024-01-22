const {sequelize}= require("../../config/mysql")
const {DataTypes} = require("sequelize");
const {Categoria} = require("./categoria");

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
        cat_id: {
            type:DataTypes.INTEGER,
            allowNull: false,
            references:{
                model: 'Categoria',
                key: 'cat_id'
            }
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


Subcategoria.associations = (models) => {
    Subcategoria.belongsTo(Categoria, {foreignKey: 'cat_id'});
};

module.exports = Subcategoria;
    