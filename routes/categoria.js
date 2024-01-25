const express = require("express");
const router = express.Router();
const {authMiddleware} = require("../middleware/session");
const uploadMiddleware = require("../utils/handleStorage");
const {getCategorias, getCategoria, createCategoria, updateCategoria, deleteCategoria, getCategoriaSubcategorias}
 = require("../controllers/categoria");
const {validatorGetCategoria, validatorInsertCategoria, validatorUpdateCategoria} = require("../validators/categoria");
const {checkRol} = require("../middleware/rol");
const app = express();
app.use(express.json());


//TODO: http://localhost/tracks GET, POST, DELETE, PUT

router.get("/",  authMiddleware,checkRol(["Admin", "Usuario"]), getCategorias);
router.get("/:id", validatorGetCategoria, authMiddleware, getCategoria);
router.post("/",  validatorInsertCategoria, authMiddleware, createCategoria);
router.put("/:id", validatorUpdateCategoria, authMiddleware, updateCategoria);
router.delete("/:id", validatorGetCategoria, authMiddleware, deleteCategoria);
router.get("/sub/:id", validatorGetCategoria, authMiddleware, getCategoriaSubcategorias);
//router.post("/",uploadMiddleware.single("usu_foto"), validatorCreateUser,customHeader, createUser);
module.exports = router;