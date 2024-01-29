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
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
  });
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

