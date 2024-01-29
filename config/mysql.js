const Sequelize = require("sequelize");
const database = process.env.DBDATABASE;
const username = process.env.DBUSER;
const password = process.env.DBPASSWORD;
const host = process.env.DBHOST;

const sequelize =  new Sequelize(
    database,username,password,
    {
        host: '212.1.208.101',
        port: 3306,
        dialect:"mysql",
        
       
    }
    
    
);

const dbConnectMysql = async () => {
    try{
        await sequelize.authenticate();
        console.log("Conexión Mysql Correcta");
    }
    catch(e){
        console.log("Error de conexión ", e);
    }
};

//dbConnectMysql();


module.exports = {dbConnectMysql, sequelize};