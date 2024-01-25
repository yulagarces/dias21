const express = require("express");
const router = express.Router();
const uploadMiddleware = require("../utils/handleStorage");
const {getRecurso, getRecursos, createRecurso, updateRecurso, deleteRecurso, getRecursoSubId} = require("../controllers/recurso");
const {validatorGetRecurso, validatorInsertRecurso, validatorUpdateRecurso} = require("../validators/recurso");
const {authMiddleware} = require("../middleware/session");
const app = express();
app.use(express.json());


//TODO: http://localhost/tracks GET, POST, DELETE, PUT

router.get("/", authMiddleware, getRecursos);
router.get("/:id", validatorGetRecurso, authMiddleware, getRecurso);
router.get("/sub_id/:id", validatorGetRecurso, authMiddleware, getRecursoSubId);
router.post("/",  validatorInsertRecurso, authMiddleware, createRecurso);
router.put("/:id", validatorUpdateRecurso, authMiddleware, updateRecurso);
router.delete("/:id", validatorGetRecurso, authMiddleware, deleteRecurso);

module.exports = router;