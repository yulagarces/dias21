const express = require("express");
const router = express.Router();
const uploadMiddleware = require("../utils/handleStorage");
const {getProceso, getProcesos, getProcesoSubcategoriaId, getProcesoUserId, createProceso, updateProceso, deleteProceso} = require("../controllers/proceso");
const {validatorGetProceso, validatorInsertProceso, validatorUpdateProceso} = require("../validators/proceso");
const customHeader = require("../middleware/customHeader");
const {authMiddleware} = require("../middleware/session");
const app = express();
app.use(express.json());


//TODO: http://localhost/tracks GET, POST, DELETE, PUT
/**
 * Obtener todas los procesos
 * @openapi
 * /proceso:
 *    get:
 *      tags:
 *        - procesos
 *      summary: "Listar procesos"
 *      description: Obtener el listado de procesos
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        '200':
 *          description: Retorna la lista de procesos.
 *          content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/proceso'
 *        '422':
 *          description: Error de validacion.
 */
router.get("/",  authMiddleware, getProcesos);
/**
 * Obtener una categoria por id
 * @openapi
 * /proceso/{id}:
 *    get:
 *      tags:
 *        - procesos
 *      summary: "Listar proceso por llave primaria"
 *      description: Obtener proceso por código de llave primaria
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - name: id
 *        in: path
 *        description: Id llave primaria de proceso a retornar
 *        required: true
 *        schema:
 *          type: integer
 *      responses:
 *        '200':
 *          description: Retorna el proceso buscado.
 *          content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/proceso'
 *        '422':
 *          description: Error de validacion.
 *        '404':
 *          description: Proceso no encontrado
 */
router.get("/:id", validatorGetProceso, authMiddleware, getProceso);
/**
 * Obtener una procesos por subcategorías
 * @openapi
 * /proceso/sub/{id}:
 *    get:
 *      tags:
 *        - procesos
 *      summary: "Listar procesos por subcategroría"
 *      description: Obtener procesos por código de llave foránea de subcategoría
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
 *          description: Retorna los procesos buscados.
 *          content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/proceso'
 *        '422':
 *          description: Error de validacion.
 *        '404':
 *          description: Procesos no encontrados
 */
router.get("/sub/:id", validatorGetProceso, authMiddleware, getProcesoSubcategoriaId);
/**
 * Obtener procesos por usuario id
 * @openapi
 * /proceso/usu/{id}:
 *    get:
 *      tags:
 *        - procesos
 *      summary: "Listar procesos por usuario"
 *      description: Obtener procesos por código de llave foránea de usuarios
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
 *          description: Retorna los procesos buscados.
 *          content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/proceso'
 *        '422':
 *          description: Error de validacion.
 *        '404':
 *          description: Procesos no encontrados
 */
router.get("/usu/:id", validatorGetProceso, authMiddleware, getProcesoUserId);
/**
 * http://localhost:3001/api/
 * Ruta registro nuevo proceso
 * @openapi
 * /proceso:
 *      post:
 *          tags:
 *              - procesos
 *          summary: "Insertar un nuevo proceso"
 *          description: "Esta ruta es para registrar un proceso"
 *          security: 
 *              - bearerAuth: []
 *          requestBody: 
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/proceso'
 *          responses:
 *                   '200': 
 *                      description: "Proceso registrado de manera correcta"
 *                   '403': 
 *                      description: "Error por validación de usuario"
 *              
 */
router.post("/",  validatorInsertProceso, authMiddleware, createProceso);
/**
 * Actualizar un proceso por llave primaria
 * @openapi
 * /proceso/{id}:
 *    put:
 *      tags:
 *        - procesos
 *      summary: "Actualizar proceso"
 *      description: Actualizar proceso por llave primaria
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - name: id
 *        in: path
 *        description: Id llave primaria de proceso a actualizar
 *        required: true
 *        schema:
 *          type: integer
 *      requestBody: 
 *          content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/proceso'
 *      responses:
 *        '200':
 *          description: Proceso actualizado exitosamente.
 *        '422':
 *          description: Error de validacion.
 */
router.put("/:id", validatorUpdateProceso, authMiddleware, updateProceso);
/**
 * Eliminar un proceso por llave primaria
 * @openapi
 * /proceso/{id}:
 *    delete:
 *      tags:
 *        - procesos
 *      summary: "Eliminar proceso"
 *      description: Eliminar proceso por lalve primaria
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - name: id
 *        in: path
 *        description: Id llave primaria de proceso a eliminar
 *        required: true
 *        schema:
 *          type: integer
 *      responses:
 *        '200':
 *          description: Proceso eliminada exitosamente.
 *          content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/proceso'
 *        '422':
 *          description: Error de validacion.
 *        '404':
 *          description: Proceso no encontrada.
 * 
 * */
router.delete("/:id", validatorGetProceso, authMiddleware, deleteProceso);

module.exports = router;