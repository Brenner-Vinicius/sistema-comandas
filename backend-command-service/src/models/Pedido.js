const mongoose = require('../config/database');

const PedidoSchema = new mongoose.Schema({
  // Os nomes aqui devem ser IGUAIS aos do Frontend
  customerName: { type: String, required: true },
  tableNumber: { type: String },
  status: { type: String, default: 'pending' },
  total: { type: Number, default: 0 },
  time: { type: String },
  // Estrutura para os itens do pedido
  itens: [{
    nome: String,
    quantidade: Number,
    precoUnitario: Number
  }]
}, {
  timestamps: true // Isso cria automaticamente o createdAt e updatedAt
});

module.exports = mongoose.model('Pedido', PedidoSchema);