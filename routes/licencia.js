const express = require("express");
const router = express.Router();
const uploadMiddleware = require("../utils/handleStorage");
const {getLicencia, getLicencias, getLicenciaPaymentId, getLicenciaUserId, createLicencia, 
    updateLicencia, deleteLicencia} = require("../controllers/licencia");
const {validatorGetLicencia, validatorInsertLicencia, validatorUpdateLicencia} = require("../validators/licencia");
const customHeader = require("../middleware/customHeader");
const app = express();
app.use(express.json());


//TODO: http://localhost/tracks GET, POST, DELETE, PUT

router.get("/",  customHeader, getLicencias);
router.get("/:id", validatorGetLicencia, customHeader, getLicencia);
router.get("/usu/:id", validatorGetLicencia, customHeader, getLicenciaUserId);
router.get("/pay/:id", validatorGetLicencia, customHeader, getLicenciaPaymentId);
router.post("/",  validatorInsertLicencia, customHeader, createLicencia);
router.put("/:id", validatorUpdateLicencia, customHeader, updateLicencia);
router.delete("/:id", validatorGetLicencia, customHeader, deleteLicencia);

module.exports = router;