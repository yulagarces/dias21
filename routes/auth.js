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
/**
 * Login user
 * @openapi
 * /auth/login:
 *    post:
 *      tags:
 *        - auth
 *      summary: "Login user"
 *      description: Iniciar session a un nuevo usuario y obtener el token de sesión
 *      responses:
 *        '200':
 *          description: Retorna el objeto insertado en la colección.
 *        '422':
 *          description: Error de validación.
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: "#/components/schemas/authLogin"
 *    responses:
 *      '201':
 *        description: Retorna el objeto insertado en la coleccion con estado '201'
 *      '403':
 *        description: No tiene permisos '403'
 */
router.post("/login", loginCtrl);

module.exports = router;