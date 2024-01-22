const express = require("express");
const router = express.Router();
const uploadMiddleware = require("../utils/handleStorage");
const {getUsers, getUser, createUser, getUserDocumento, updateUser, deleteUser} = require("../controllers/user");
const {validatorCreateUser, validatorGetUsuario, validatorGetUsuarioDocumento, validatorUpdateUser} = require("../validators/user");
const customHeader = require("../middleware/customHeader");


//TODO: http://localhost/tracks GET, POST, DELETE, PUT

router.get("/", customHeader, getUsers);
router.get("/:id", validatorGetUsuario, customHeader, getUser);
router.get("/docu/:id", customHeader, getUserDocumento);
router.post("/",uploadMiddleware.single("usu_foto"), validatorCreateUser,customHeader, createUser);
router.put("/:id",uploadMiddleware.single("usu_foto"), validatorUpdateUser,customHeader, updateUser);
router.delete("/:id", validatorGetUsuarioDocumento, customHeader, deleteUser);

module.exports = router;