const express = require ("express");
const router = express.Router();
const uploadMiddleware = require("../utils/handleStorage");
const{createUser} = require("../controllers/storage");


router.post("/",uploadMiddleware.single("myfile"), createUser);
module.exports = router;