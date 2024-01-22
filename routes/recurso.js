const express = require("express");
const router = express.Router();
const uploadMiddleware = require("../utils/handleStorage");
const {getRecurso, getRecursos, createRecurso, updateRecurso, deleteRecurso, getRecursoSubId} = require("../controllers/recurso");
const {validatorGetRecurso, validatorInsertRecurso, validatorUpdateRecurso} = require("../validators/recurso");
const customHeader = require("../middleware/customHeader");
const app = express();
app.use(express.json());


//TODO: http://localhost/tracks GET, POST, DELETE, PUT

router.get("/", customHeader, getRecursos);
router.get("/:id", validatorGetRecurso, customHeader, getRecurso);
router.get("/sub_id/:id", validatorGetRecurso, customHeader, getRecursoSubId);
router.post("/",  validatorInsertRecurso, customHeader, createRecurso);
router.put("/:id", validatorUpdateRecurso, customHeader, updateRecurso);
router.delete("/:id", validatorGetRecurso, customHeader, deleteRecurso);

module.exports = router;