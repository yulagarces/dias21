const express = require("express");
const router = express.Router();
const uploadMiddleware = require("../utils/handleStorage");
const {createUser, loginCtrl} = require("../controllers/auth");
const {validatorRegister} = require("../validators/auth");
const customHeader = require("../middleware/customHeader");


//TODO: http://localhost/tracks GET, POST, DELETE, PUT

/**
 * http://localhost:3001/api/
 * Ruta registro nuevo usuario
 * @openapi
 * /auth/register:
 *      post:
 *          tags:
 *              - auth
 *          summary: "Registrar nuevo usuario"
 *          description: "Esta ruta es para registrar un nuevo usuario de forma segura"
 *          requestBody: 
 *              content: 
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/authRegister'
 *          responses:
 *                   '201': 
 *                      description: "Usuario registrado de manera correcta"
 *                   '403': 
 *                      description: "Error por validación de usuario"
 *              
 */
router.post("/register",uploadMiddleware.single("usu_foto"), validatorRegister,customHeader, createUser);
router.post("/login",customHeader, loginCtrl);
/*
router.get("/", customHeader, getUsers);
router.get("/:id", validatorGetUsuario, customHeader, getUser);
router.get("/docu/:id", customHeader, getUserDocumento);

router.put("/:id",uploadMiddleware.single("usu_foto"), validatorUpdateUser,customHeader, updateUser);
router.delete("/:id", validatorGetUsuarioDocumento, customHeader, deleteUser);*/

module.exports = router;