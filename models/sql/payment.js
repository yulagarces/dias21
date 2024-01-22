const {sequelize}= require("../../config/mysql")
const {DataTypes} = require("sequelize");

const Payments = sequelize.define(
    "payments",
    {
        payment_id:{
            type: DataTypes.INTEGER,
            allowNull:  false,
            primaryKey: true,
            autoIncrement: true,
        },
        item_number:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        txn_id: {
            type:DataTypes.STRING,
            allowNull: false,
        },
        payment_gross: {
            type:DataTypes.FLOAT,
            allowNull: false,
        },

        currency_code: {
            type:DataTypes.STRING,
            allowNull: false,
        },
        payment_status: {
            type:DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        timestamps: true,
    }
);

module.exports = Payments;
    