const mongoose = require('../config/database')

const PedidoSchema = new mongoose.Schema({
  comanda: { type: mongoose.Schema.Types.ObjectId, ref: 'Comanda' },
  status: { type: String, default: 'aberto' }
})

module.exports = mongoose.model('Pedido', PedidoSchema)