const express = require("express");
const router = express.Router();
const uploadMiddleware = require("../utils/handleStorage");
const {getProceso, getProcesos, getProcesoSubcategoriaId, getProcesoUserId, createProceso, updateProceso, deleteProceso} = require("../controllers/proceso");
const {validatorGetProceso, validatorInsertProceso, validatorUpdateProceso} = require("../validators/proceso");
const customHeader = require("../middleware/customHeader");
const app = express();
app.use(express.json());


//TODO: http://localhost/tracks GET, POST, DELETE, PUT

router.get("/",  customHeader, getProcesos);
router.get("/:id", validatorGetProceso, customHeader, getProceso);
router.get("/sub/:id", validatorGetProceso, customHeader, getProcesoSubcategoriaId);
router.get("/usu/:id", validatorGetProceso, customHeader, getProcesoUserId);
router.post("/",  validatorInsertProceso, customHeader, createProceso);
router.put("/:id", validatorUpdateProceso, customHeader, updateProceso);
router.delete("/:id", validatorGetProceso, customHeader, deleteProceso);

module.exports = router;