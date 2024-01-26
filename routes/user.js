const express = require("express");
const router = express.Router();
const uploadMiddleware = require("../utils/handleStorage");
const {getUsers, getUser, createUser, getUserDocumento, updateUser, deleteUser} = require("../controllers/user");
const {validatorCreateUser, validatorGetUsuario, validatorGetUsuarioDocumento, validatorUpdateUser} = require("../validators/user");
const {authMiddleware} = require("../middleware/session");

//TODO: http://localhost/tracks GET, POST, DELETE, PUT
/**
 * Obtener todos los usuarios
 * @openapi
 * /user:
 *    get:
 *      tags:
 *        - usuarios
 *      summary: "Listar usuarios"
 *      description: Obtener el listado de usuarios
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        '200':
 *          description: Retorna la lista de los usuarios.
 *          content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/usuarios'
 *        '422':
 *          description: Error de validacion.
 */
router.get("/", authMiddleware, getUsers);
/**
 * Obtener un usuario por id
 * @openapi
 * /user/{id}:
 *    get:
 *      tags:
 *        - usuarios
 *      summary: "Listar usuarios por llave primaria"
 *      description: Obtener el listado de usuarios
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - name: id
 *        in: path
 *        description: Id llave primaria de usuario a retornar
 *        required: true
 *        schema:
 *          type: integer
 *      responses:
 *        '200':
 *          description: Retorna la lista de los usuarios.
 *          content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/usuarios'
 *        '422':
 *          description: Error de validacion.
 */
router.get("/:id", validatorGetUsuario, authMiddleware, getUser);
/**
 * Obtener un usuario por id
 * @openapi
 * /user/docu/{id}:
 *    get:
 *      tags:
 *        - usuarios
 *      summary: "Listar usuarios por documento"
 *      description: Obtener el usuario con documento específico
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - name: id
 *        in: path
 *        description: Documento de identidad del usuario
 *        required: true
 *        schema:
 *          type: integer
 *      responses:
 *        '200':
 *          description: Retorna el usuario solicitado.
 *          content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/usuarios'
 *        '422':
 *          description: Error de validacion.
 */
router.get("/docu/:id", authMiddleware, getUserDocumento);
/**
 * http://localhost:3001/api/
 * Ruta registro nuevo usuario
 * @openapi
 * /user:
 *      post:
 *          tags:
 *              - usuarios
 *          summary: "Insertar un usuario sin restricciones"
 *          description: "Esta ruta es para registrar un nuevo usuario sin encriptación"
 *          security: 
 *              - bearerAuth: []
 *          requestBody: 
 *              content: 
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/usuarios'
 *          responses:
 *                   '200': 
 *                      description: "Usuario registrado de manera correcta"
 *                   '403': 
 *                      description: "Error por validación de usuario"
 *              
 */
router.post("/",uploadMiddleware.single("usu_foto"), validatorCreateUser,authMiddleware, createUser);
/**
 * Actualizar un usuario por documento de identidad
 * @openapi
 * /user/{id}:
 *    put:
 *      tags:
 *        - usuarios
 *      summary: "Actualizar usuario"
 *      description: Actualizar usuario por llave primaria
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - name: id
 *        in: path
 *        description: Id llave primaria de usuario a actualizar
 *        required: true
 *        schema:
 *          type: integer
 *      requestBody: 
 *          content:
 *           multipart/form-data:
 *             schema:
 *               $ref: '#/components/schemas/usuarios'
 *      responses:
 *        '200':
 *          description: Usuario actualizado exitosamente.
 *        '422':
 *          description: Error de validacion.
 */
router.put("/:id",uploadMiddleware.single("usu_foto"), validatorUpdateUser,authMiddleware, updateUser);
/**
 * Eliminar un usuario por documento de identidad
 * @openapi
 * /user/{id}:
 *    delete:
 *      tags:
 *        - usuarios
 *      summary: "Eliminar usuario"
 *      description: Eliminar usuario por documento de identidad
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - name: id
 *        in: path
 *        description: Id llave primaria de usuario a eliminar
 *        required: true
 *        schema:
 *          type: integer
 *      responses:
 *        '200':
 *          description: Usuario eliminado exitosamente.
 *          content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/usuarios'
 *        '422':
 *          description: Error de validacion.
 */
router.delete("/:id", validatorGetUsuarioDocumento, authMiddleware, deleteUser);

module.exports = router;