const express = require("express");
const router = express.Router();
const uploadMiddleware = require("../utils/handleStorage");
const {getGrabacion, getGrabaciones, getGrabacionProId, createGrabacion, updateGrabacion, deleteGrabacion} = require("../controllers/grabacion");
const {validatorGetGrabacion, validatorInsertGrabacion, validatorUpdateGrabacion} = require("../validators/grabacion");
const customHeader = require("../middleware/customHeader");
const app = express();
app.use(express.json());


//TODO: http://localhost/tracks GET, POST, DELETE, PUT

router.get("/",  customHeader, getGrabaciones);
router.get("/:id", validatorGetGrabacion, customHeader, getGrabacion);
router.get("/pro/:id", validatorGetGrabacion, customHeader, getGrabacionProId);
router.post("/",  validatorInsertGrabacion, customHeader, createGrabacion);
router.put("/:id", validatorUpdateGrabacion, customHeader, updateGrabacion);
router.delete("/:id", validatorGetGrabacion, customHeader, deleteGrabacion);

module.exports = router;