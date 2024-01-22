const { body, matchedData } = require('express-validator');
const {paymentsModel} = require('../models'); 
const { handleHttpError } = require('../utils/handleError');
const PUBLIC_URL = process.env.PUBLIC_URL;
const express = require("express");
const Payment = require('../models/sql/payment');
const app = express();
app.use(express.json());

/**
 * Obtener el listado de pagos de la base de datos
 * @param {*} req 
 * @param {*} res 
 */
const getPayments= async (req, res) => {
    try{
        const data = await paymentsModel.findAll({});
        res.send({data});
    }
    catch(e){
        handleHttpError(res, "ERROR AL OBTENER PAGOS", 500);
    }
    
};

/**
 * Obtrener un pago específico
 * @param {*} req 
 * @param {*} res 
 */
const getPayment = async (req, res) => {
    try{
        const pay_id = req.params.id;
        const data = await paymentsModel.findByPk(pay_id);
        if(!data){
            return res.status(404).json({error: 'Pago no encontrado'});
        }
        res.send({data});
    }
    catch(e){
        handleHttpError(res, "ERROR AL OBTENER PAGO", 500);
    }
    
};

/**
 * Obtrener un pago por fecha
 * @param {*} req 
 * @param {*} res 
 */
const getPaymentDate = async (req, res) => {
    try{
        const createdAt = req.params.id;
        const data = await paymentsModel.findAll(
            {where: {createdAt:createdAt}}
        );
        if(!data){
            return res.status(404).json({error: 'Pago no encontrado'});
        }
        res.send({data});
    }
    catch(e){
        handleHttpError(res, "ERROR_GET_PAYMENT_DATE", 500);
    }
    
};

/**
 * Insertar un pago
 * @param {*} req 
 * @param {*} res 
 */
const createPayment = async (req, res) => {
  
        try {
         const { body } = req
         const fileData = {
             item_number: body.item_number,
             txn_id: body.txn_id,
             payment_gross: body.payment_gross,
             currency_code: body.currency_code,
             payment_status: body.payment_status,
            
        }
     
         const data =  await paymentsModel.create(fileData)
         console.log(data);
         res.send({data})
        } catch (e) {
            console.error(e);
          handleHttpError(res, "ERROR_CREATE_PAYMENT", 500);
        }
      
};

/**
 * Actualizar un pago
 * @param {*} req 
 * @param {*} res 
 */
const updatePayment= async (req, res) => {

    try {
        const   payment_id = req.params.id;
        const data = await paymentsModel.findByPk(payment_id);
        const { body } = req
   
        if (!data){
            return res.status(404).json({error: 'Pago no encontrado'});
        }
        data.item_number= body.item_number;
        data.txn_id= body.txn_id,
        data.payment_gross= body.payment_gross,
        data.currency_code= body.currency_code,
        data.payment_status= body.payment_status,
                
        await data.save();
        console.log(data);
        res.status(200).send({data});
       } catch (e) {
           console.error(e);
         handleHttpError(res, "ERROR_UPDATE_PAGO", 500);
       }
};
/**
 * Eliminar un pago
 * @param {*} req 
 * @param {*} res 
 */
const deletePayment = async (req, res) => {
    const   payment_id = req.params.id;
    try{
        const data = await paymentsModel.findByPk(payment_id);
        if(!data){
            return res.status(404).json({error: 'Pago no encontrado'});
        }
        await data.destroy();
        res.json({error: 'Pago eliminado exitosamente'});
    }
    catch(e){
        handleHttpError(res, "ERROR_DELETE_PAGO", 500);
    }
   

};

module.exports = {getPayments, getPayment, getPaymentDate,createPayment, updatePayment, deletePayment};