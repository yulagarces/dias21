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

router.get("/", authMiddleware, getPayments);
router.get("/:id", validatorGetPayment, authMiddleware, getPayment);
router.get("/date/:id", validatorGetPayment, authMiddleware, getPaymentDate);
router.post("/",  validatorInsertPayment, authMiddleware, createPayment);
router.put("/:id", validatorUpdatePayment, authMiddleware, updatePayment);
router.delete("/:id", validatorGetPayment, authMiddleware, deletePayment);

module.exports = router;