const express = require("express");
const router = express.Router();
const uploadMiddleware = require("../utils/handleStorage");
const {getRecordatorio, getRecordatorios, getRecordatorioProId, createRecordatorio, updateRecordatorio, deleteRecordatorio} = require("../controllers/recordatorio");
const {validatorGetRecordatorio, validatorInsertRecordatorio, validatorUpdateRecordatorio} = require("../validators/recordatorio");
const {authMiddleware} = require("../middleware/session");
const app = express();
app.use(express.json());


//TODO: http://localhost/tracks GET, POST, DELETE, PUT

router.get("/",  authMiddleware, getRecordatorios);
router.get("/:id", validatorGetRecordatorio, authMiddleware, getRecordatorio);
router.get("/pro/:id", validatorGetRecordatorio, authMiddleware, getRecordatorioProId);
router.post("/",  validatorInsertRecordatorio, authMiddleware, createRecordatorio);
router.put("/:id", validatorUpdateRecordatorio, authMiddleware, updateRecordatorio);
router.delete("/:id", validatorGetRecordatorio, authMiddleware, deleteRecordatorio);

module.exports = router;