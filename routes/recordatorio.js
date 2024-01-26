const express = require("express");
const router = express.Router();
const uploadMiddleware = require("../utils/handleStorage");
const {getRecordatorio, getRecordatorios, getRecordatorioProId, createRecordatorio, updateRecordatorio, deleteRecordatorio} = require("../controllers/recordatorio");
const {validatorGetRecordatorio, validatorInsertRecordatorio, validatorUpdateRecordatorio} = require("../validators/recordatorio");
const {authMiddleware} = require("../middleware/session");
const app = express();
app.use(express.json());


//TODO: http://localhost/tracks GET, POST, DELETE, PUT
/**
 * Obtener todas los recordatorios
 * @openapi
 * /recordatorio:
 *    get:
 *      tags:
 *        - recordatorios
 *      summary: "Listar recordatorios"
 *      description: Obtener el listado de recordatorios
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        '200':
 *          description: Retorna la lista de recordatorios.
 *          content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/recordatorio'
 *        '422':
 *          description: Error de validacion.
 */
router.get("/",  authMiddleware, getRecordatorios);
/**
 * Obtener un recordatorio por id
 * @openapi
 * /recordatorio/{id}:
 *    get:
 *      tags:
 *        - recordatorios
 *      summary: "Listar recordatorio por llave primaria"
 *      description: Obtener recordatorio por código de llave primaria
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - name: id
 *        in: path
 *        description: Id llave primaria de recordatorio a retornar
 *        required: true
 *        schema:
 *          type: integer
 *      responses:
 *        '200':
 *          description: Retorna el recordatorio buscado.
 *          content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/recordatorio'
 *        '422':
 *          description: Error de validacion.
 *        '404':
 *          description: Recordatorio no encontrado
 */
router.get("/:id", validatorGetRecordatorio, authMiddleware, getRecordatorio);
/**
 * Obtener recordatorios de un proceso
 * @openapi
 * /recordatorio/pro/{id}:
 *    get:
 *      tags:
 *        - recordatorios
 *      summary: "Listar recordatorios por proceso"
 *      description: Obtener recordatorios por código de llave foránea de proceso
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
 *          description: Retorna los recordatorios buscados
 *          content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/recordatorio'
 *        '422':
 *          description: Error de validacion.
 *        '404':
 *          description: Recordatorios no encontrado
 */
router.get("/pro/:id", validatorGetRecordatorio, authMiddleware, getRecordatorioProId);
/**
 * http://localhost:3001/api/
 * Ruta registro nuevo recordatorio
 * @openapi
 * /recordatorio:
 *      post:
 *          tags:
 *              - recordatorios
 *          summary: "Insertar un nuevo recordatorio"
 *          description: "Esta ruta es para registrar un nuevo recordatorio"
 *          security: 
 *              - bearerAuth: []
 *          requestBody: 
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/recordatorio'
 *          responses:
 *                   '200': 
 *                      description: "Recordatorio registrado de manera correcta"
 *                   '403': 
 *                      description: "Error por validación de usuario"
 *              
 */
router.post("/",  validatorInsertRecordatorio, authMiddleware, createRecordatorio);
/**
 * Actualizar un recordatorio por llave primaria
 * @openapi
 * /recordatorio/{id}:
 *    put:
 *      tags:
 *        - recordatorios
 *      summary: "Actualizar recordatorio"
 *      description: Actualizar recordatorio por llave primaria
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - name: id
 *        in: path
 *        description: Id llave primaria de recordatorio a actualizar
 *        required: true
 *        schema:
 *          type: integer
 *      requestBody: 
 *          content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/recordatorio'
 *      responses:
 *        '200':
 *          description: Recordatorio actualizado exitosamente.
 *        '422':
 *          description: Error de validacion.
 */
router.put("/:id", validatorUpdateRecordatorio, authMiddleware, updateRecordatorio);
/**
 * Eliminar un recordatorio por llave primaria
 * @openapi
 * /recordatorio/{id}:
 *    delete:
 *      tags:
 *        - recordatorios
 *      summary: "Eliminar recordatorio"
 *      description: Eliminar recordatorio por lalve primaria
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - name: id
 *        in: path
 *        description: Id llave primaria de recordatorio a eliminar
 *        required: true
 *        schema:
 *          type: integer
 *      responses:
 *        '200':
 *          description: Recordatorio eliminado exitosamente.
 *          content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/recordatorio'
 *        '422':
 *          description: Error de validacion.
 *        '404':
 *          description: recordatorio no encontrado.
 * 
 * */
router.delete("/:id", validatorGetRecordatorio, authMiddleware, deleteRecordatorio);

module.exports = router;