const mongoose = require('../config/database')

const ComandaSchema = new mongoose.Schema({
  cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente' },
  mesa: { type: mongoose.Schema.Types.ObjectId, ref: 'Mesa' },
  aberta: { type: Boolean, default: true }
})

module.exports = mongoose.model('Comanda', ComandaSchema)