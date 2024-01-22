const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

const validatorGetPayment = [
    check("id").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next);

    }
];

const validatorInsertPayment =[
    check("item_number").exists().notEmpty(),
    check("txn_id").exists().notEmpty(),
    check("payment_gross").exists().notEmpty(),
    check("currency_code").exists().notEmpty(),
    check("payment_status").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res,next);
    }

];
const validatorUpdatePayment =[
    check("item_number").exists().notEmpty(),
    check("txn_id").exists().notEmpty(),
    check("payment_gross").exists().notEmpty(),
    check("currency_code").exists().notEmpty(),
    check("payment_status").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res,next);
    }

];

module.exports = { validatorGetPayment, validatorInsertPayment, validatorUpdatePayment}