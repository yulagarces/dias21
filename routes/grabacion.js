const express = require("express");
const router = express.Router();
const {getGrabacion, getGrabaciones, getGrabacionProId, createGrabacion, updateGrabacion, deleteGrabacion} = require("../controllers/grabacion");
const {validatorGetGrabacion, validatorInsertGrabacion, validatorUpdateGrabacion} = require("../validators/grabacion");
const {authMiddleware} = require("../middleware/session");
const app = express();
app.use(express.json());


//TODO: http://localhost/tracks GET, POST, DELETE, PUT
/**
 * Obtener todas las grabaciones
 * @openapi
 * /grabacion:
 *    get:
 *      tags:
 *        - grabaciones
 *      summary: "Listar grabaciones"
 *      description: Obtener el listado de las grabaciones
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        '200':
 *          description: Retorna la lista de las grabaciones.
 *          content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/grabacion'
 *        '422':
 *          description: Error de validacion.
 */
router.get("/",  authMiddleware, getGrabaciones);
/**
 * Obtener una grabación por id
 * @openapi
 * /grabacion/{id}:
 *    get:
 *      tags:
 *        - grabaciones
 *      summary: "Listar grabación por llave primaria"
 *      description: Obtener grabación por código de llave primaria
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - name: id
 *        in: path
 *        description: Id llave primaria de grabación a retornar
 *        required: true
 *        schema:
 *          type: integer
 *      responses:
 *        '200':
 *          description: Retorna la grabación buscada.
 *          content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/grabacion'
 *        '422':
 *          description: Error de validacion.
 *        '404':
 *          description: Grabación no encontrada
 */
router.get("/:id", validatorGetGrabacion, authMiddleware, getGrabacion);
/**
 * Obtener grabaciones por proceso
 * @openapi
 * /grabacion/pro/{id}:
 *    get:
 *      tags:
 *        - grabaciones
 *      summary: "Listar grabaciones por código de proceso"
 *      description: Obtener grabaciones por código de llave foránea de proceso
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - name: id
 *        in: path
 *        description: Id llave foránea a consultar
 *        required: true
 *        schema:
 *          type: integer
 *      responses:
 *        '200':
 *          description: Retorna las grabaciones buscadas.
 *          content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/grabacion'
 *        '422':
 *          description: Error de validacion.
 *        '404':
 *          description: Grabación no encontrada
 */
router.get("/pro/:id", validatorGetGrabacion, authMiddleware, getGrabacionProId);
/**
 * http://localhost:3001/api/
 * Ruta registro nueva grabación
 * @openapi
 * /grabacion:
 *      post:
 *          tags:
 *              - grabaciones
 *          summary: "Insertar una nueva grabación"
 *          description: "Esta ruta es para registrar una nueva grabación"
 *          security: 
 *              - bearerAuth: []
 *          requestBody: 
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/grabacion'
 *          responses:
 *                   '200': 
 *                      description: "Grabación registrada de manera correcta"
 *                   '403': 
 *                      description: "Error por validación de usuario"
 *              
 */
router.post("/",  validatorInsertGrabacion, authMiddleware, createGrabacion);
/**
 * Actualizar una grabación por llave primaria
 * @openapi
 * /grabacion/{id}:
 *    put:
 *      tags:
 *        - grabaciones
 *      summary: "Actualizar grabación"
 *      description: Actualizar grabación por llave primaria
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - name: id
 *        in: path
 *        description: Id llave primaria de grabación a actualizar
 *        required: true
 *        schema:
 *          type: integer
 *      requestBody: 
 *          content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/grabacion'
 *      responses:
 *        '200':
 *          description: Grabación actualizada exitosamente.
 *        '422':
 *          description: Error de validacion.
 */
router.put("/:id", validatorUpdateGrabacion, authMiddleware, updateGrabacion);
/**
 * Eliminar una grabación por llave primaria
 * @openapi
 * /grabacion/{id}:
 *    delete:
 *      tags:
 *        - grabaciones
 *      summary: "Eliminar grabación"
 *      description: Eliminar grabación por lalve primaria
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - name: id
 *        in: path
 *        description: Id llave primaria de grabación a eliminar
 *        required: true
 *        schema:
 *          type: integer
 *      responses:
 *        '200':
 *          description: Grabación eliminada exitosamente.
 *          content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/grabación'
 *        '422':
 *          description: Error de validacion.
 *        '404':
 *          description: Grabación no encontrada.
 * 
 * */
router.delete("/:id", validatorGetGrabacion, authMiddleware, deleteGrabacion);

module.exports = router;