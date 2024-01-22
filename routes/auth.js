const express = require("express");
const router = express.Router();
const uploadMiddleware = require("../utils/handleStorage");
const {getUsers, getUser, createUser, getUserDocumento, updateUser, deleteUser} = require("../controllers/auth");
const {validatorRegister} = require("../validators/auth");
const customHeader = require("../middleware/customHeader");


//TODO: http://localhost/tracks GET, POST, DELETE, PUT

router.post("/register",uploadMiddleware.single("usu_foto"), validatorRegister,customHeader, createUser);
/*
router.get("/", customHeader, getUsers);
router.get("/:id", validatorGetUsuario, customHeader, getUser);
router.get("/docu/:id", customHeader, getUserDocumento);

router.put("/:id",uploadMiddleware.single("usu_foto"), validatorUpdateUser,customHeader, updateUser);
router.delete("/:id", validatorGetUsuarioDocumento, customHeader, deleteUser);*/

module.exports = router;