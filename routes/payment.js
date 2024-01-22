const express = require("express");
const router = express.Router();
const uploadMiddleware = require("../utils/handleStorage");
const {getPayment, getPayments, getPaymentDate,createPayment, updatePayment, deletePayment} = require("../controllers/payment");
const {validatorGetPayment, validatorInsertPayment, validatorUpdatePayment} = require("../validators/payment");
const customHeader = require("../middleware/customHeader");
const app = express();
app.use(express.json());


//TODO: http://localhost/tracks GET, POST, DELETE, PUT

router.get("/", customHeader, getPayments);
router.get("/:id", validatorGetPayment, customHeader, getPayment);
router.get("/date/:id", validatorGetPayment, customHeader, getPaymentDate);
router.post("/",  validatorInsertPayment, customHeader, createPayment);
router.put("/:id", validatorUpdatePayment, customHeader, updatePayment);
router.delete("/:id", validatorGetPayment, customHeader, deletePayment);

module.exports = router;