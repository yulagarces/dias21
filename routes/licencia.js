const express = require("express");
const router = express.Router();
const uploadMiddleware = require("../utils/handleStorage");
const {getLicencia, getLicencias, getLicenciaPaymentId, getLicenciaUserId, createLicencia, 
    updateLicencia, deleteLicencia} = require("../controllers/licencia");
const {validatorGetLicencia, validatorInsertLicencia, validatorUpdateLicencia} = require("../validators/licencia");
const customHeader = require("../middleware/customHeader");
const {authMiddleware} = require("../middleware/session");
const app = express();
app.use(express.json());


//TODO: http://localhost/tracks GET, POST, DELETE, PUT

router.get("/",  authMiddleware, getLicencias);
router.get("/:id", validatorGetLicencia, authMiddleware, getLicencia);
router.get("/usu/:id", validatorGetLicencia, authMiddleware, getLicenciaUserId);
router.get("/pay/:id", validatorGetLicencia, authMiddleware, getLicenciaPaymentId);
router.post("/",  validatorInsertLicencia, authMiddleware, createLicencia);
router.put("/:id", validatorUpdateLicencia, authMiddleware, updateLicencia);
router.delete("/:id", validatorGetLicencia, authMiddleware, deleteLicencia);

module.exports = router;