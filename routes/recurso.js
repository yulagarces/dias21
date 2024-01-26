const express = require("express");
const router = express.Router();
const uploadMiddleware = require("../utils/handleStorage");
const {getRecurso, getRecursos, createRecurso, updateRecurso, deleteRecurso, getRecursoSubId} = require("../controllers/recurso");
const {validatorGetRecurso, validatorInsertRecurso, validatorUpdateRecurso} = require("../validators/recurso");
const {authMiddleware} = require("../middleware/session");
const app = express();
app.use(express.json());


//TODO: http://localhost/tracks GET, POST, DELETE, PUT
/**
 * Obtener todas los recursos
 * @openapi
 * /recurso:
 *    get:
 *      tags:
 *        - recursos
 *      summary: "Listar recursos"
 *      description: Obtener el listado de los recursos
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        '200':
 *          description: Retorna la lista de recursos.
 *          content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/recurso'
 *        '422':
 *          description: Error de validacion.
 */
router.get("/", authMiddleware, getRecursos);
/**
 * Obtener un recurso por id
 * @openapi
 * /recurso/{id}:
 *    get:
 *      tags:
 *        - recursos
 *      summary: "Listar recurso por llave primaria"
 *      description: Obtener recurso por código de llave primaria
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - name: id
 *        in: path
 *        description: Id llave primaria de recurso a retornar
 *        required: true
 *        schema:
 *          type: integer
 *      responses:
 *        '200':
 *          description: Retorna el recurso buscada.
 *          content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/recurso'
 *        '422':
 *          description: Error de validacion.
 *        '404':
 *          description: recurso no encontrado
 */
router.get("/:id", validatorGetRecurso, authMiddleware, getRecurso);
/**
 * Obtener un recurso por  subcategorías
 * @openapi
 * /recurso/sub_id/{id}:
 *    get:
 *      tags:
 *        - recursos
 *      summary: "Listar recurso por llave foránea de subcategoría"
 *      description: Obtener recurso por código de llave foránea de subcategorías
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
 *          description: Retorna el recurso buscado.
 *          content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/recurso'
 *        '422':
 *          description: Error de validacion.
 *        '404':
 *          description: recurso no encontrado.
 */
router.get("/sub_id/:id", validatorGetRecurso, authMiddleware, getRecursoSubId);
/**
 * http://localhost:3001/api/
 * Ruta registro nuevo recurso
 * @openapi
 * /recurso:
 *      post:
 *          tags:
 *              - recursos
 *          summary: "Insertar un nuevo recurso"
 *          description: "Esta ruta es para registrar un nuevo recurso"
 *          security: 
 *              - bearerAuth: []
 *          requestBody: 
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/recurso'
 *          responses:
 *                   '200': 
 *                      description: "recurso registrado de manera correcta"
 *                   '403': 
 *                      description: "Error por validación de usuario"
 *              
 */
router.post("/",  validatorInsertRecurso, authMiddleware, createRecurso);
/**
 * Actualizar un recurso por llave primaria
 * @openapi
 * /recurso/{id}:
 *    put:
 *      tags:
 *        - recursos
 *      summary: "Actualizar recurso"
 *      description: Actualizar recurso por llave primaria
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - name: id
 *        in: path
 *        description: Id llave primaria de recurso a actualizar
 *        required: true
 *        schema:
 *          type: integer
 *      requestBody: 
 *          content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/recurso'
 *      responses:
 *        '200':
 *          description: recurso actualizado exitosamente.
 *        '422':
 *          description: Error de validacion.
 */
router.put("/:id", validatorUpdateRecurso, authMiddleware, updateRecurso);
/**
 * Eliminar un recurso por llave primaria
 * @openapi
 * /recurso/{id}:
 *    delete:
 *      tags:
 *        - recursos
 *      summary: "Eliminar recurso"
 *      description: Eliminar recurso por llave primaria
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - name: id
 *        in: path
 *        description: Id llave primaria de recurso a eliminar
 *        required: true
 *        schema:
 *          type: integer
 *      responses:
 *        '200':
 *          description: Recurso eliminado exitosamente.
 *          content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/recurso'
 *        '422':
 *          description: Error de validacion.
 *        '404':
 *          description: Recurso no encontrado.
 * 
 * */
router.delete("/:id", validatorGetRecurso, authMiddleware, deleteRecurso);

module.exports = router;