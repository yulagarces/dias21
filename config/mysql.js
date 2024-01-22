const { Sequelize } = require("sequelize");
const database = process.env.DBDATABASE;
const username = process.env.DBUSER;
const password = process.env.DBPASSWORD;
const host = process.env.DBHOST;

const sequelize =  new Sequelize(
    database,
    username,
    password,
    {
        host, 
        dialect:"mysql"
    }
    
);

/*async function reiniciarSincronizacion() {
    try {
      // Cerrar la conexión actual
      await sequelize.close();
  
      // Volver a abrir la conexión
      await sequelize.authenticate();
      
      // Sincronizar los modelos nuevamente
      await sequelize.sync();
  
      console.log('El estado del modelo ha sido restablecido correctamente.');
    } catch (error) {
      console.error('Error al restablecer el estado del modelo:', error);
    }
  }*/
  
  // Llamar a la función para restablecer el estado del modelo



const dbConnectMysql = async () => {
    try{
        await sequelize.authenticate();
       // await sequelize.sync();
        console.log("Conexión Mysql Correcta");
    }
    catch(e){
        console.log("Error de conexión ", e);
    }
};

//dbConnectMysql();


module.exports = {dbConnectMysql, sequelize};