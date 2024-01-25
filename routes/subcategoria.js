const express = require("express");
const router = express.Router();
const uploadMiddleware = require("../utils/handleStorage");
const {getSubcategorias, getSubcategoriasFull, getSubcategoria, createSubcategoria, updateSubcategoria, deleteSubcategoria, getSubcategoriaCatId} = require("../controllers/subcategoria");
const {validatorGetSubcategoria, validatorInsertSubcategoria, validatorUpdateSubcategoria} = require("../validators/subcategoria");
const {authMiddleware} = require("../middleware/session");
const app = express();
app.use(express.json());


//TODO: http://localhost/tracks GET, POST, DELETE, PUT

router.get("/",  authMiddleware, getSubcategorias);
router.get("/full/",  authMiddleware, getSubcategoriasFull);
router.get("/:id", validatorGetSubcategoria, authMiddleware, getSubcategoria);
router.get("/buscar-sub-cat/:id", validatorGetSubcategoria, authMiddleware, getSubcategoriaCatId);
router.post("/",  validatorInsertSubcategoria, authMiddleware, createSubcategoria);
router.put("/:id", validatorUpdateSubcategoria, authMiddleware, updateSubcategoria);
router.delete("/:id", validatorGetSubcategoria, authMiddleware, deleteSubcategoria);

module.exports = router;