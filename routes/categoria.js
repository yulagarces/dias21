const express = require("express");
const router = express.Router();
const {authMiddleware} = require("../middleware/session");
const uploadMiddleware = require("../utils/handleStorage");
const {getCategorias, getCategoria, createCategoria, updateCategoria, deleteCategoria, getCategoriaSubcategorias}
 = require("../controllers/categoria");
const {validatorGetCategoria, validatorInsertCategoria, validatorUpdateCategoria} = require("../validators/categoria");
const {checkRol} = require("../middleware/rol");
const app = express();
app.use(express.json());


//TODO: http://localhost/tracks GET, POST, DELETE, PUT
/**
 * Obtener todas las categorias
 * @openapi
 * /categoria:
 *    get:
 *      tags:
 *        - categorias
 *      summary: "Listar categorias"
 *      description: Obtener el listado de las categorias
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        '200':
 *          description: Retorna la lista de las categorías.
 *          content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/categoria'
 *        '422':
 *          description: Error de validacion.
 */
router.get("/",  authMiddleware,checkRol(["Admin", "Usuario"]), getCategorias);
/**
 * Obtener una categoria por id
 * @openapi
 * /categoria/{id}:
 *    get:
 *      tags:
 *        - categorias
 *      summary: "Listar categoría por llave primaria"
 *      description: Obtener categoría por código de llave primaria
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - name: id
 *        in: path
 *        description: Id llave primaria de categoría a retornar
 *        required: true
 *        schema:
 *          type: integer
 *      responses:
 *        '200':
 *          description: Retorna la categoría buscada.
 *          content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/categoria'
 *        '422':
 *          description: Error de validacion.
 *        '404':
 *          description: Categoría no encontrada
 */
router.get("/:id", validatorGetCategoria, authMiddleware, getCategoria);
/**
 * Obtener una categoría con subcategorías
 * @openapi
 * /categoria/sub/{id}:
 *    get:
 *      tags:
 *        - categorias
 *      summary: "Listar categoría por llave primaria con subcategorías"
 *      description: Obtener categoría por código de llave foránea con sus subcategorías
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
 *          description: Retorna la categoría buscada.
 *          content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/categoria'
 *        '422':
 *          description: Error de validacion.
 *        '404':
 *          description: Categoría no encontrada
 */
router.get("/sub/:id", validatorGetCategoria, authMiddleware, getCategoriaSubcategorias);
/**
 * http://localhost:3001/api/
 * Ruta registro nueva categoría
 * @openapi
 * /categoria:
 *      post:
 *          tags:
 *              - categorias
 *          summary: "Insertar una nueva categoría"
 *          description: "Esta ruta es para registrar una nueva categoría"
 *          security: 
 *              - bearerAuth: []
 *          requestBody: 
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/categoria'
 *          responses:
 *                   '200': 
 *                      description: "Categoría registrada de manera correcta"
 *                   '403': 
 *                      description: "Error por validación de usuario"
 *              
 */
router.post("/",  validatorInsertCategoria, authMiddleware, createCategoria);
/**
 * Actualizar una categoría por llave primaria
 * @openapi
 * /categoria/{id}:
 *    put:
 *      tags:
 *        - categorias
 *      summary: "Actualizar categoría"
 *      description: Actualizar categoría por llave primaria
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - name: id
 *        in: path
 *        description: Id llave primaria de categoría a actualizar
 *        required: true
 *        schema:
 *          type: integer
 *      requestBody: 
 *          content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/categoria'
 *      responses:
 *        '200':
 *          description: Categoría actualizada exitosamente.
 *        '422':
 *          description: Error de validacion.
 */
router.put("/:id", validatorUpdateCategoria, authMiddleware, updateCategoria);
/**
 * Eliminar una categoría por llave primaria
 * @openapi
 * /categoria/{id}:
 *    delete:
 *      tags:
 *        - categorias
 *      summary: "Eliminar categoría"
 *      description: Eliminar categoría por lalve primaria
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - name: id
 *        in: path
 *        description: Id llave primaria de categoría a eliminar
 *        required: true
 *        schema:
 *          type: integer
 *      responses:
 *        '200':
 *          description: Categoría eliminada exitosamente.
 *          content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/categoria'
 *        '422':
 *          description: Error de validacion.
 *        '404':
 *          description: Categoría no encontrada.
 * 
 * */
router.delete("/:id", validatorGetCategoria, authMiddleware, deleteCategoria);

module.exports = router;