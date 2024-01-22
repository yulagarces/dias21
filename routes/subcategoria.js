const express = require("express");
const router = express.Router();
const uploadMiddleware = require("../utils/handleStorage");
const {getSubcategorias, getSubcategoria, createSubcategoria, updateSubcategoria, deleteSubcategoria, getSubcategoriaCatId} = require("../controllers/subcategoria");
const {validatorGetSubcategoria, validatorInsertSubcategoria, validatorUpdateSubcategoria} = require("../validators/subcategoria");
const customHeader = require("../middleware/customHeader");
const app = express();
app.use(express.json());


//TODO: http://localhost/tracks GET, POST, DELETE, PUT

router.get("/",  customHeader, getSubcategorias);
router.get("/:id", validatorGetSubcategoria, customHeader, getSubcategoria);
router.get("/buscar-sub-cat/:id", validatorGetSubcategoria, customHeader, getSubcategoriaCatId);
router.post("/",  validatorInsertSubcategoria, customHeader, createSubcategoria);
router.put("/:id", validatorUpdateSubcategoria, customHeader, updateSubcategoria);
router.delete("/:id", validatorGetSubcategoria, customHeader, deleteSubcategoria);

module.exports = router;