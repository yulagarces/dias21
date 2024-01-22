const { body, matchedData } = require('express-validator');
const {categoriaModel} = require('../models'); 
const { handleHttpError } = require('../utils/handleError');
const PUBLIC_URL = process.env.PUBLIC_URL;
const express = require("express");
const Subcategoria = require('../models/sql/subcategoria');
const Categoria = require('../models/sql/categoria');
const app = express();
app.use(express.json());

/**
 * Obtener el listado de categorias de la base de datos
 * @param {*} req 
 * @param {*} res 
 */
const getCategorias = async (req, res) => {
    try{
        const data = await categoriaModel.findAll({});
        res.send({data});
    }
    catch(e){
        handleHttpError(res, "ERROR AL OBTENER CATEGORIAS", 500);
    }
    
};

/**
 * Obtrener una categoría específica
 * @param {*} req 
 * @param {*} res 
 */
const getCategoria = async (req, res) => {
    try{
        const cat_id1 = req.params.id;
        const data = await categoriaModel.findByPk(cat_id1);
        if(!data){
            return res.status(404).json({error: 'Categoría no encontrada'});
        }
        res.send({data});
    }
    catch(e){
        handleHttpError(res, "ERROR AL OBTENER CATEGORIA", 500);
    }
    
};

/**
 * Obtrener una categoría específica con sus subcategorías
 * @param {*} req 
 * @param {*} res 
 */
const getCategoriaSubcategorias = async (req, res) => {
    try{
        const id = req.params.id;
        const data = await Categoria.findByPk(id, {
            include : Subcategoria
        });
        if(!data){
            return res.status(404).json({error: 'Categoría no encontrada'});
        }
        res.send({data});
    }
    catch(e){
        console.log(e);
        handleHttpError(res, "ERROR AL OBTENER CATEGORIA CON SUB", 500);
    }
    
};

/**
 * Insertar una categoria
 * @param {*} req 
 * @param {*} res 
 */
const createCategoria = async (req, res) => {
  
        try {
         const { body } = req
         const fileData = {
             cat_nombre: body.cat_nombre,
             cat_imagen_claro: body.cat_imagen_claro,
             cat_imagen_oscuro: body.cat_imagen_oscuro,
             cat_descripcion: body.cat_descripcion,
             cat_titulo_largo: body.cat_titulo_largo,
             cat_color : body.cat_color
        }
     
         const data =  await categoriaModel.create(fileData)
         console.log(data);
         res.send({data})
        } catch (e) {
            console.error(e);
          handleHttpError(res, "ERROR_CREATE_CATEGORIA", 500);
        }
      
};

/**
 * Actualizar una categoria
 * @param {*} req 
 * @param {*} res 
 */
const updateCategoria = async (req, res) => {

    try {
        const   cat_id1 = req.params.id;
        const data = await categoriaModel.findByPk(cat_id1);
        const { body } = req
   
        if (!data){
            return res.status(404).json({error: 'Categoría no encontrada'});
        }
        data.cat_nombre = body.cat_nombre;
        data.cat_imagen_claro= body.cat_imagen_claro,
        data.cat_imagen_oscuro= body.cat_imagen_oscuro,
        data.cat_descripcion= body.cat_descripcion,
        data.cat_titulo_largo= body.cat_titulo_largo,
        data.cat_color = body.cat_color 
        
        await data.save();
        console.log(data);
        res.status(200).send({data});
       } catch (e) {
           console.error(e);
         handleHttpError(res, "ERROR_UPDATE_CATEGORIA", 500);
       }
};
/**
 * Eliminar una categoria
 * @param {*} req 
 * @param {*} res 
 */
const deleteCategoria = async (req, res) => {
    const   cat_id1 = req.params.id;
    try{
        const data = await categoriaModel.findByPk(cat_id1);
        if(!data){
            return res.status(404).json({error: 'Categoría no encontrada'});
        }
        await data.destroy();
        res.json({error: 'Categoría eliminada exitosamente'});
    }
    catch(e){
        handleHttpError(res, "ERROR_DELETE_CATEGORIA", 500);
    }
   

};

module.exports = {getCategoria, getCategorias, createCategoria, updateCategoria, deleteCategoria, 
    getCategoriaSubcategorias};