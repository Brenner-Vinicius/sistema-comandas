const mongoose = require('../config/database')

const ItemPedidoSchema = new mongoose.Schema({
  pedido: { type: mongoose.Schema.Types.ObjectId, ref: 'Pedido' },
  produto: { type: mongoose.Schema.Types.ObjectId, ref: 'Produto' },
  quantidade: Number,
  precoUnitario: Number
})

module.exports = mongoose.model('ItemPedido', ItemPedidoSchema)