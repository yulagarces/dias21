const express = require("express");
const router = express.Router();
const uploadMiddleware = require("../utils/handleStorage");
const {getLicencia, getLicencias, getLicenciaPaymentId, getLicenciaUserId, createLicencia, 
    updateLicencia, deleteLicencia} = require("../controllers/licencia");
const {validatorGetLicencia, validatorInsertLicencia, validatorUpdateLicencia} = require("../validators/licencia");
const customHeader = require("../middleware/customHeader");
const {authMiddleware} = require("../middleware/session");
const app = express();
app.use(express.json());


//TODO: http://localhost/tracks GET, POST, DELETE, PUT
/**
 * Obtener todas las licencias
 * @openapi
 * /licencia:
 *    get:
 *      tags:
 *        - licencias
 *      summary: "Listar licencias"
 *      description: Obtener el listado de las licencias
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        '200':
 *          description: Retorna la lista de las licencias.
 *          content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/licencia'
 *        '422':
 *          description: Error de validacion.
 */
router.get("/",  authMiddleware, getLicencias);
/**
 * Obtener una categoria por id
 * @openapi
 * /licencia/{id}:
 *    get:
 *      tags:
 *        - licencias
 *      summary: "Listar licencia por llave primaria"
 *      description: Obtener licencia por código de llave primaria
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - name: id
 *        in: path
 *        description: Id llave primaria de licencia a retornar
 *        required: true
 *        schema:
 *          type: integer
 *      responses:
 *        '200':
 *          description: Retorna la licencia buscada.
 *          content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/licencia'
 *        '422':
 *          description: Error de validacion.
 *        '404':
 *          description: Licencia no encontrada
 */
router.get("/:id", validatorGetLicencia, authMiddleware, getLicencia);
/**
 * Obtener una licencia por usuario id
 * @openapi
 * /licencia/usu/{id}:
 *    get:
 *      tags:
 *        - licencias
 *      summary: "Listar licencias por llave foránea de usuario"
 *      description: Obtener licencias por código de llave foránea con del usuario
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - name: id
 *        in: path
 *        description: Id llave foránea a retornar
 *        required: true
 *        schema:
 *          type: integer
 *      responses:
 *        '200':
 *          description: Retorna las licencias buscadas.
 *          content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/licencia'
 *        '422':
 *          description: Error de validacion.
 *        '404':
 *          description: Licencia no encontrada
 */
router.get("/usu/:id", validatorGetLicencia, authMiddleware, getLicenciaUserId);
/**
 * Obtener una licencia por payment id
 * @openapi
 * /licencia/pay/{id}:
 *    get:
 *      tags:
 *        - licencias
 *      summary: "Listar licencias por llave foránea de payment"
 *      description: Obtener licencias por código de llave foránea del payment
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - name: id
 *        in: path
 *        description: Id llave foránea a retornar
 *        required: true
 *        schema:
 *          type: integer
 *      responses:
 *        '200':
 *          description: Retorna las licencias buscadas.
 *          content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/licencia'
 *        '422':
 *          description: Error de validacion.
 *        '404':
 *          description: Licencia no encontrada
 */
router.get("/pay/:id", validatorGetLicencia, authMiddleware, getLicenciaPaymentId);
/**
 * http://localhost:3001/api/
 * Ruta registro nueva licencia
 * @openapi
 * /licencia:
 *      post:
 *          tags:
 *              - licencias
 *          summary: "Insertar una nueva licencia"
 *          description: "Esta ruta es para registrar una nueva licencia"
 *          security: 
 *              - bearerAuth: []
 *          requestBody: 
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/licencia'
 *          responses:
 *                   '200': 
 *                      description: "Licencia registrada de manera correcta"
 *                   '403': 
 *                      description: "Error por validación de usuario"
 *              
 */
router.post("/",  validatorInsertLicencia, authMiddleware, createLicencia);
/**
 * Actualizar una licencia por llave primaria
 * @openapi
 * /licencia/{id}:
 *    put:
 *      tags:
 *        - licencias
 *      summary: "Actualizar licencia"
 *      description: Actualizar licencia por llave primaria
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - name: id
 *        in: path
 *        description: Id llave primaria de licencia a actualizar
 *        required: true
 *        schema:
 *          type: integer
 *      requestBody: 
 *          content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/licencia'
 *      responses:
 *        '200':
 *          description: Licencia actualizada exitosamente.
 *        '422':
 *          description: Error de validacion.
 */
router.put("/:id", validatorUpdateLicencia, authMiddleware, updateLicencia);
/**
 * Eliminar una licencia por llave primaria
 * @openapi
 * /licencia/{id}:
 *    delete:
 *      tags:
 *        - licencias
 *      summary: "Eliminar licencia"
 *      description: Eliminar licencia por lalve primaria
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - name: id
 *        in: path
 *        description: Id llave primaria de licencia a eliminar
 *        required: true
 *        schema:
 *          type: integer
 *      responses:
 *        '200':
 *          description: Licencia eliminada exitosamente.
 *          content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/licencia'
 *        '422':
 *          description: Error de validacion.
 *        '404':
 *          description: Licencia no encontrada.
 * 
 * */
router.delete("/:id", validatorGetLicencia, authMiddleware, deleteLicencia);

module.exports = router;