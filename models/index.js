const models = {
    userModel: require('./sql/user'),
    categoriaModel: require('./sql/categoria'),
    subcategoriaModel: require('./sql/subcategoria'),
    recursoModel: require('./sql/recurso'),
    paymentsModel: require('./sql/payment'),
    licenciaModel: require('./sql/licencia'),
    procesoModel: require('./sql/proceso'),
    grabacionModel: require('./sql/grabacion'),
    recordatorioModel: require('./sql/recordatorio')
}

module.exports = models;