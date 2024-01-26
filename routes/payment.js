const express = require("express");
const router = express.Router();
const uploadMiddleware = require("../utils/handleStorage");
const {getPayment, getPayments, getPaymentDate,createPayment, updatePayment, deletePayment} = require("../controllers/payment");
const {validatorGetPayment, validatorInsertPayment, validatorUpdatePayment} = require("../validators/payment");
const customHeader = require("../middleware/customHeader");
const {authMiddleware} = require("../middleware/session");
const app = express();
app.use(express.json());


//TODO: http://localhost/tracks GET, POST, DELETE, PUT
/**
 * Obtener todas los payments
 * @openapi
 * /payment:
 *    get:
 *      tags:
 *        - payments
 *      summary: "Listar payments"
 *      description: Obtener el listado de payments
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        '200':
 *          description: Retorna la lista de payments.
 *          content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/paymnets'
 *        '422':
 *          description: Error de validacion.
 */
router.get("/", authMiddleware, getPayments);
/**
 * Obtener un payment por id
 * @openapi
 * /payment/{id}:
 *    get:
 *      tags:
 *        - payments
 *      summary: "Listar payment por llave primaria"
 *      description: Obtener payment por código de llave primaria
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - name: id
 *        in: path
 *        description: Id llave primaria de payment a retornar
 *        required: true
 *        schema:
 *          type: integer
 *      responses:
 *        '200':
 *          description: Retorna payment buscado.
 *          content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/payments'
 *        '422':
 *          description: Error de validacion.
 *        '404':
 *          description: Payment no encontrada
 */
router.get("/:id", validatorGetPayment, authMiddleware, getPayment);
/**
 * Obtener payment por fecha
 * @openapi
 * /payment/date/{id}:
 *    get:
 *      tags:
 *        - payments
 *      summary: "Listar payments por fecha"
 *      description: Obtener payment por fecha de creación
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - name: id
 *        in: path
 *        description: fecha de creación
 *        required: true
 *        schema:
 *          type: date
 *      responses:
 *        '200':
 *          description: Retorna la categoría buscada.
 *          content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/payments'
 *        '422':
 *          description: Error de validacion.
 *        '404':
 *          description: Payment no encontrado
 */
router.get("/date/:id", validatorGetPayment, authMiddleware, getPaymentDate);
/**
 * http://localhost:3001/api/
 * Ruta registro nuevo payment
 * @openapi
 * /payment:
 *      post:
 *          tags:
 *              - payments
 *          summary: "Insertar un nuev payment"
 *          description: "Esta ruta es para registrar un payment"
 *          security: 
 *              - bearerAuth: []
 *          requestBody: 
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/payments'
 *          responses:
 *                   '200': 
 *                      description: "Payment registrado de manera correcta"
 *                   '403': 
 *                      description: "Error por validación de usuario"
 *              
 */
router.post("/",  validatorInsertPayment, authMiddleware, createPayment);
/**
 * Actualizar un payment por llave primaria
 * @openapi
 * /payment/{id}:
 *    put:
 *      tags:
 *        - payments
 *      summary: "Actualizar payment"
 *      description: Actualizar payment por llave primaria
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - name: id
 *        in: path
 *        description: Id llave primaria de payment a actualizar
 *        required: true
 *        schema:
 *          type: integer
 *      requestBody: 
 *          content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/payments'
 *      responses:
 *        '200':
 *          description: Payment actualizado exitosamente.
 *        '422':
 *          description: Error de validacion.
 */
router.put("/:id", validatorUpdatePayment, authMiddleware, updatePayment);
/**
 * Eliminar un payment por llave primaria
 * @openapi
 * /payment/{id}:
 *    delete:
 *      tags:
 *        - payments
 *      summary: "Eliminar payment"
 *      description: Eliminar payment por lalve primaria
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - name: id
 *        in: path
 *        description: Id llave primaria de payment a eliminar
 *        required: true
 *        schema:
 *          type: integer
 *      responses:
 *        '200':
 *          description: Payment eliminado exitosamente.
 *          content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/payments'
 *        '422':
 *          description: Error de validacion.
 *        '404':
 *          description: Payment no encontrado.
 * 
 * */
router.delete("/:id", validatorGetPayment, authMiddleware, deletePayment);

module.exports = router;