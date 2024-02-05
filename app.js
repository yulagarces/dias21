require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const {dbConnectMysql} = require('./config/mysql');
const swaggerUI = require("swagger-ui-express");
const openApiConfigration = require('./docs/swagger');



app.use(cors());
app.use(express.json());
app.use(express.static("storage"))



const puerto = process.env.PORT || 3000

app.get("/", (req,res) => {
    res.send("Hello World");
});

app.use("/api", require("./routes"));

/**
 * Invocación de rutas
 */
app.listen(puerto, () => {
    console.log(`http://localhost:${puerto}`)
});
/**
 * Ruta de documentación
*/
app.use('/documentation', swaggerUI.serve, swaggerUI.setup(openApiConfigration));


dbConnectMysql();

