const express = require("express");
const router = express.Router();
const uploadMiddleware = require("../utils/handleStorage");
const {getGrabacion, getGrabaciones, getGrabacionProId, createGrabacion, updateGrabacion, deleteGrabacion} = require("../controllers/grabacion");
const {validatorGetGrabacion, validatorInsertGrabacion, validatorUpdateGrabacion} = require("../validators/grabacion");
const {authMiddleware} = require("../middleware/session");
const app = express();
app.use(express.json());


//TODO: http://localhost/tracks GET, POST, DELETE, PUT

router.get("/",  authMiddleware, getGrabaciones);
router.get("/:id", validatorGetGrabacion, authMiddleware, getGrabacion);
router.get("/pro/:id", validatorGetGrabacion, authMiddleware, getGrabacionProId);
router.post("/",  validatorInsertGrabacion, authMiddleware, createGrabacion);
router.put("/:id", validatorUpdateGrabacion, authMiddleware, updateGrabacion);
router.delete("/:id", validatorGetGrabacion, authMiddleware, deleteGrabacion);

module.exports = router;