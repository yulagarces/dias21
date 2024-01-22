const express = require("express");
const router = express.Router();
const uploadMiddleware = require("../utils/handleStorage");
const {getRecordatorio, getRecordatorios, getRecordatorioProId, createRecordatorio, updateRecordatorio, deleteRecordatorio} = require("../controllers/recordatorio");
const {validatorGetRecordatorio, validatorInsertRecordatorio, validatorUpdateRecordatorio} = require("../validators/recordatorio");
const customHeader = require("../middleware/customHeader");
const app = express();
app.use(express.json());


//TODO: http://localhost/tracks GET, POST, DELETE, PUT

router.get("/",  customHeader, getRecordatorios);
router.get("/:id", validatorGetRecordatorio, customHeader, getRecordatorio);
router.get("/pro/:id", validatorGetRecordatorio, customHeader, getRecordatorioProId);
router.post("/",  validatorInsertRecordatorio, customHeader, createRecordatorio);
router.put("/:id", validatorUpdateRecordatorio, customHeader, updateRecordatorio);
router.delete("/:id", validatorGetRecordatorio, customHeader, deleteRecordatorio);

module.exports = router;