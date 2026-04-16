const mongoose = require('../config/database')

const MesaSchema = new mongoose.Schema({
  numero: Number,
  status: String
})

module.exports = mongoose.model('Mesa', MesaSchema)