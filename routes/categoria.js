const express = require("express");
const router = express.Router();
const uploadMiddleware = require("../utils/handleStorage");
const {getCategorias, getCategoria, createCategoria, updateCategoria, deleteCategoria, getCategoriaSubcategorias}
 = require("../controllers/categoria");
const {validatorGetCategoria, validatorInsertCategoria, validatorUpdateCategoria} = require("../validators/categoria");
const customHeader = require("../middleware/customHeader");
const app = express();
app.use(express.json());


//TODO: http://localhost/tracks GET, POST, DELETE, PUT

router.get("/",  customHeader, getCategorias);
router.get("/:id", validatorGetCategoria, customHeader, getCategoria);
router.post("/",  validatorInsertCategoria, customHeader, createCategoria);
router.put("/:id", validatorUpdateCategoria, customHeader, updateCategoria);
router.delete("/:id", validatorGetCategoria, customHeader, deleteCategoria);
router.get("/sub/:id", validatorGetCategoria, customHeader, getCategoriaSubcategorias);
//router.post("/",uploadMiddleware.single("usu_foto"), validatorCreateUser,customHeader, createUser);
module.exports = router;