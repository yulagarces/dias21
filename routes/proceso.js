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

router.get("/",  authMiddleware, getProcesos);
router.get("/:id", validatorGetProceso, authMiddleware, getProceso);
router.get("/sub/:id", validatorGetProceso, authMiddleware, getProcesoSubcategoriaId);
router.get("/usu/:id", validatorGetProceso, authMiddleware, getProcesoUserId);
router.post("/",  validatorInsertProceso, authMiddleware, createProceso);
router.put("/:id", validatorUpdateProceso, authMiddleware, updateProceso);
router.delete("/:id", validatorGetProceso, authMiddleware, deleteProceso);

module.exports = router;