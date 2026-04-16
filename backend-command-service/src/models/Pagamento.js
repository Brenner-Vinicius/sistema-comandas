const mongoose = require('../config/database')

const PagamentoSchema = new mongoose.Schema({
  pedido: { type: mongoose.Schema.Types.ObjectId, ref: 'Pedido' },
  forma: String,
  valor: Number
})

module.exports = mongoose.model('Pagamento', PagamentoSchema)