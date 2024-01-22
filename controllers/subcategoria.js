const {matchedData } = require('express-validator');
const {subcategoriaModel} = require('../models'); 
const { handleHttpError } = require('../utils/handleError');
const PUBLIC_URL = process.env.PUBLIC_URL;
const express = require("express");
const { ValidationError } = require('sequelize');
const app = express();
app.use(express.json());

/**
 * Obtener el listado de subcategorias de la base de datos
 * @param {*} req 
 * @param {*} res 
 */
const getSubcategorias = async (req, res) => {
    try{
        const data = await subcategoriaModel.findAll({});
        if(!data){
            return res.status(404).json({error: 'No existen subcategorias'});
        }
        res.send({data});
    }
    catch(e){
        console.log(e);
        handleHttpError(res, "ERROR AL OBTENER SUBCATEGORIAS", 500);
    }
    
};

/**
 * Obtrener una subcategoria especifica
 * @param {*} req 
 * @param {*} res 
 */
const getSubcategoria = async (req, res) => {
    try{
        const sub_id = req.params.id;
        const data = await subcategoriaModel.findByPk(sub_id);
        if(!data){
            return res.status(404).json({error: 'Subcategoría no encontrada'});
        }
        res.send({data});
    }
    catch(e){
        handleHttpError(res, "ERROR AL OBTENER CATEGORIA", 500);
    }
    
};

/**
 * Obtrener una subcategoria por código de categoría
 * @param {*} req 
 * @param {*} res 
 */
const getSubcategoriaCatId = async (req, res) => {
    try{
        const cat_id = req.params.id;
        const data = await subcategoriaModel.findAll(
            {where: {cat_id:cat_id}}
        );
        if(!data){
            return res.status(404).json({error: 'Subcategoría no encontrada'});
        }
        res.send({data});
    }
    catch(e){
        handleHttpError(res, "ERROR AL OBTENER CATEGORIA", 500);
    }
    
};

/**
 * Insertar una subcategoria
 * @param {*} req 
 * @param {*} res 
 */
const createSubcategoria = async (req, res) => {
  
        try {
         const { body } = req
         const fileData = {
             sub_nombre: body.sub_nombre,
             sub_imagen_claro: body.sub_imagen_claro,
             sub_imagen_oscuro: body.sub_imagen_oscuro,
             cat_id: body.cat_id,
             sub_color : body.sub_color
        }
     
         const data =  await subcategoriaModel.create(fileData)
         if(!data){
            return res.status(404).json({error: 'Subcategoría no fue creada'});
         }
         console.log(data);
         res.send({data})
        } catch (e) {
            console.error('Este es el error'+e);
            handleHttpError(res, "ERROR_CREATE_SUBCATEGORIA");
        }
};

/**
 * Actualizar una subcategoria
 * @param {*} req 
 * @param {*} res 
 */
const updateSubcategoria = async (req, res) => {

    try {
        const   sub_id = req.params.id;
        const data = await subcategoriaModel.findByPk(sub_id);
        const { body } = req
   
        if (!data){
            return res.status(404).json({error: 'Subcategoría no encontrada'});
        }
        data.sub_nombre = body.sub_nombre;
        data.sub_imagen_claro= body.sub_imagen_claro,
        data.sub_imagen_oscuro= body.sub_imagen_oscuro,
        data.cat_id= body.cat_id,
        data.sub_color = body.sub_color 
        
        await data.save();
        console.log(data);
        res.status(200).send({data});
       } catch (e) {
           console.error(e);
         handleHttpError(res, "ERROR_UPDATE_SUBCATEGORIA", 500);
       }
};
/**
 * Eliminar una subcategoria
 * @param {*} req 
 * @param {*} res 
 */
const deleteSubcategoria = async (req, res) => {
    const   sub_id = req.params.id;
    try{
        const data = await subcategoriaModel.findByPk(sub_id);
        if(!data){
            return res.status(404).json({error: 'Subcategoría no encontrada'});
        }
        await data.destroy();
        res.json({error: 'Subcategoría eliminada exitosamente'});
    }
    catch(e){
        handleHttpError(res, "ERROR_DELETE_SUBCATEGORIA", 500);
    }
   

};

module.exports = {getSubcategoria, getSubcategorias, createSubcategoria, updateSubcategoria,
     deleteSubcategoria, getSubcategoriaCatId};