const mongoose = require('../config/database')

const ClienteSchema = new mongoose.Schema({
  nome: String,
  telefone: String
})

module.exports = mongoose.model('Cliente', ClienteSchema)