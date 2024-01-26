const express = require("express");
const router = express.Router();
const uploadMiddleware = require("../utils/handleStorage");
const {getSubcategorias, getSubcategoriasFull, getSubcategoria, createSubcategoria, updateSubcategoria, deleteSubcategoria, getSubcategoriaCatId} = require("../controllers/subcategoria");
const {validatorGetSubcategoria, validatorInsertSubcategoria, validatorUpdateSubcategoria} = require("../validators/subcategoria");
const {authMiddleware} = require("../middleware/session");
const app = express();
app.use(express.json());


//TODO: http://localhost/tracks GET, POST, DELETE, PUT
/**
 * Obtener todas las subcategorías
 * @openapi
 * /subcategoria:
 *    get:
 *      tags:
 *        - subcategorias
 *      summary: "Listar subcategoria"
 *      description: Obtener el listado de las subcategoria
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        '200':
 *          description: Retorna la lista de las subcategoria.
 *          content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/subcategoria'
 *        '422':
 *          description: Error de validacion.
 */
router.get("/",  authMiddleware, getSubcategorias);
/**
 * Obtener todas las subcategorías con categorías
 * @openapi
 * /subcategoria/full:
 *    get:
 *      tags:
 *        - subcategorias
 *      summary: "Listar subcategoria con categorías"
 *      description: Obtener el listado de las subcategoria con categoría
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        '200':
 *          description: Retorna la lista de las subcategoria con categorías.
 *          content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/subcategoria'
 *        '422':
 *          description: Error de validacion.
 */
router.get("/full/",  authMiddleware, getSubcategoriasFull);
/**
 * Obtener una subcategoría específica
 * @openapi
 * /subcategoria/{id}:
 *    get:
 *      tags:
 *        - subcategorias
 *      summary: "Listar subcategoría por llave primaria"
 *      description: Obtener subcategoría por código de llave primaria
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
 *          description: Retorna la subcategoría buscada.
 *          content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/subcategoria'
 *        '422':
 *          description: Error de validacion.
 *        '404':
 *          description: Subcategoría no encontrada
 */
router.get("/:id", validatorGetSubcategoria, authMiddleware, getSubcategoria);
/**
 * Obtener una subcategoría por id de categoría
 * @openapi
 * /subcategoria/buscar-sub-cat/{id}:
 *    get:
 *      tags:
 *        - subcategorias
 *      summary: "Listar subcategorías por categoría"
 *      description: Obtener subcategorías por código de llave foránea de categoría
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - name: id
 *        in: path
 *        description: Id llave foránea de categoría a retornar
 *        required: true
 *        schema:
 *          type: integer
 *      responses:
 *        '200':
 *          description: Retorna las subcategoría buscadas.
 *          content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/subcategoria'
 *        '422':
 *          description: Error de validacion.
 *        '404':
 *          description: Subcategoría no encontradas
 */
router.get("/buscar-sub-cat/:id", validatorGetSubcategoria, authMiddleware, getSubcategoriaCatId);
/**
 * http://localhost:3001/api/
 * Ruta registro nueva subcategoría
 * @openapi
 * /subcategoria:
 *      post:
 *          tags:
 *              - subcategorias
 *          summary: "Insertar una nueva subcategoría"
 *          description: "Esta ruta es para registrar una nueva subcategoría"
 *          security: 
 *              - bearerAuth: []
 *          requestBody: 
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/subcategoria'
 *          responses:
 *                   '200': 
 *                      description: "Subcategoría registrada de manera correcta"
 *                   '403': 
 *                      description: "Error por validación de usuario"
 *              
 */
router.post("/",  validatorInsertSubcategoria, authMiddleware, createSubcategoria);
/**
 * Actualizar una subcategoría por llave primaria
 * @openapi
 * /subcategoria/{id}:
 *    put:
 *      tags:
 *        - subcategorias
 *      summary: "Actualizar subcategoría"
 *      description: Actualizar subcategoría por llave primaria
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - name: id
 *        in: path
 *        description: Id llave primaria de subcategoría a actualizar
 *        required: true
 *        schema:
 *          type: integer
 *      requestBody: 
 *          content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/subcategoria'
 *      responses:
 *        '200':
 *          description: Subcategoría actualizada exitosamente.
 *        '422':
 *          description: Error de validacion.
 */
router.put("/:id", validatorUpdateSubcategoria, authMiddleware, updateSubcategoria);
/**
 * Eliminar una subcategoría por llave primaria
 * @openapi
 * /subcategoria/{id}:
 *    delete:
 *      tags:
 *        - subcategorias
 *      summary: "Eliminar subcategoría"
 *      description: Eliminar subcategoría por lalve primaria
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - name: id
 *        in: path
 *        description: Id llave primaria de subcategoría a eliminar
 *        required: true
 *        schema:
 *          type: integer
 *      responses:
 *        '200':
 *          description: Subcategoría eliminada exitosamente.
 *          content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/subcategoria'
 *        '422':
 *          description: Error de validacion.
 *        '404':
 *          description: Subcategoría no encontrada.
 * 
 * */
router.delete("/:id", validatorGetSubcategoria, authMiddleware, deleteSubcategoria);

module.exports = router;