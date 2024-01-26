const swaggerJsdoc = require("swagger-jsdoc");

/**
 * API Config Info
 */

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Documentacion API 21 Días",
    version: "1.0.0",
  },
  servers: [
    {
      url: "http://localhost:3001/api",
    },
    {
      url: "https://afternoon-journey-32165.herokuapp.com/api",
    },
  ],
  components: {
    securitySchemes:{
        bearerAuth:{
            type:"http",
            scheme:"bearer"
        }
    },
    schemas: {
      authLogin: {
        type: "object",
        required: ["usu_correo", "usu_contrasenia"],
        properties: {
          usu_correo: {
            type: "email",
          },
          usu_contrasenia: {
            type: "string",
          },
        },
      },
      authRegister: {
        type: "object",
        required: ["usu_dni", "usu_documento", "usu_correo", "usu_genero", "usu_contrasenia", "usu_nombre", "usu_rol"],
        properties: {
          usu_dni: {
            type: "integer",
          },
          usu_documento: {
            type: "integer",
          },
          usu_correo: {
            type: "email",
          },
          usu_genero: {
            type: "string",
            enum: ["Femenino","Masculion","LGBTQIA+"]
          },
          usu_contrasenia: {
            type: "string",
          },  
          usu_edad: {
            type: "integer",
          }, 
          usu_foto: {
            type: "string",
          },  
          usu_nombre: {
            type: "string",
          },  
          usu_rol: {
            type: "string",
            enum: ["Admin","Usuario","Invitado"]
          },
        },
      },
      categoria: {
        type: "object",
        required: ["cat_id", "cat_nombre", "cat_color"],
        properties: {
          cat_id: {
            type: "integer",
          },
          cat_nombre: {
            type: "string",
          },
          cat_imagen_claro: {
            type: "string",
          },
          cat_imagen_oscuro: {
            type: "string",
          },
          cat_descripcion: {
            type: "string",
          },
          cat_titulo_largo: {
            type: "string",
          },
          cat_color: {
            type: "string",
          },
        },
      },
      subcategoria: {
        type: "object",
        required: ["sub_id", "sub_nombre", "cat_id_f"],
        properties: {
          sub_id: {
            type: "integer",
          },
          sub_nombre: {
            type: "string",
          },
          sub_imagen_claro: {
            type: "string",
          },
          cat_id_f: {
            type: "integer",
          },
          sub_imagen_oscuro: {
            type: "string",
          },
          sub_color: {
            type: "string",
          },
        },
      },
      grabacion: {
        type: "object",
        required: ["gra_id", "gra_audio", "pro_id"],
        properties: {
          gra_id: {
            type: "integer",
          },
          gra_audio: {
            type: "string",
          },
          gra_fecha: {
            type: "date",
          },
          pro_id: {
            type: "integer",
          }          
        },
      },
      licencia: {
        type: "object",
        required: ["lic_id", "lic_fecha_i", "lic_fecha_f", "usu_dni", "payment_id"],
        properties: {
          lic_id: {
            type: "integer",
          },
          lic_fecha_i: {
            type: "date",
          },
          lic_fecha_f: {
            type: "date",
          },
          lic_valor: {
            type: "double",
          },
          lic_estado_usuario: {
            type: "string",
            enum: ["Activo","Inactivo"]
          },
          lic_tipo: {
            type: "string",
            enum: ["Mensual","Trimestral", "Semestral", "Proceso", "Prueba"]
          },
          usu_dni: {
            type: "integer",
          },
          payment_id: {
            type: "integer",
          },
        },
      },
      payments: {
        type: "object",
        required: ["payment_id", "item_number", "txn_id", "payment_gross", "currency_code", "payment_status"],
        properties: {
          payment_id: {
            type: "integer",
          },
          item_number: {
            type: "string",
          },
          txn_id: {
            type: "string",
          },
          payment_gross: {
            type: "float",
          },
          currency_code: {
            type: "string",
          },          
          payment_status: {
            type: "string",
          },
        },
      },
      proceso: {
        type: "object",
        required: ["pro_id", "pro_fecha_i", "pro_fecha_fin", "usu_id", "sub_id"],
        properties: {
          pro_id: {
            type: "integer",
          },
          pro_fecha_inicio: {
            type: "date",
          },
          pro_fecha_fin: {
            type: "date",
          },
          pro_fecha_ui: {
            type: "date",
          },
          pro_volumen_g: {
            type: "string",
          },
          pro_volumen_c: {
            type: "string",
          },
          pro_dia: {
            type: "integer",
          },
          pro_imagen_fondo: {
            type: "string",
          },
          sub_id: {
            type: "integer",
          },
          usu_id: {
            type: "integer",
          },
        },
      },
      recordatorio: {
        type: "object",
        required: ["rec_id", "rec_hora", "rec_tipo", "pro_id"],
        properties: {
          rec_id: {
            type: "integer",
          },
          rec_fecha_i: {
            type: "date",
          },
          rec_fecha_f: {
            type: "date",
          },
          rec_hora: {
            type: "time",
          },
          rec_tipo: {
            type: "string",
            enum: ["Alarma","Recordatorio"]
          },  
          pro_id: {
            type: "integer",
          },        
        },
      },
      recurso: {
        type: "object",
        required: ["recu_id", "recu_texto", "recu_genero", "recu_tipo", "recu_lenguaje", "sub_id"],
        properties: {
          recu_id: {
            type: "integer",
          },
          recu_texto: {
            type: "string",
          },
          recu_genero:{
            type: "string",
            enum: ["Femenino","Masculino","LGBTQIA+","No Aplica"]
          },
          recu_contenido: {
            type: "string",
          },
          recu_tipo: {
            type: "string",
            enum: ["Frase","Lectura","Video","Link","Tarea","Sonido","Mensaje","Otro"]
          },
          recu_lenguaje: {
            type: "string",
          },  
          sub_id: {
            type: "integer",
          },        
        },
      },
      usuarios: {
        type: "object",
        required: ["usu_documento", "usu_correo", "usu_genero", "usu_nombre", "usu_rol"],
        properties: {
          usu_dni: {
            type: "integer",
          },
          usu_documento: {
            type: "integer",
          },
          usu_correo: {
            type: "email",
          },
          usu_genero: {
            type: "string",
            enum: ["Femenino","Masculino","LGBTQIA+"]
          },
          usu_contrasenia: {
            type: "string",
          },  
          usu_edad: {
            type: "integer",
          }, 
          usu_foto: {
            type: "string",
            format: "binary"
          },  
          usu_nombre: {
            type: "string",
          },  
          usu_rol: {
            type: "string",
            enum: ["Admin","Usuario","Invitado"]
          },
               
        },
      },
    },
  },
};

/**
 * Opciones
 */
const options = {
  swaggerDefinition,
  apis: ["./routes/*.js"],
};

const openApiConfigration = swaggerJsdoc(options);

module.exports = openApiConfigration;