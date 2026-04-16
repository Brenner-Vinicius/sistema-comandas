const mongoose = require('../config/database')

const ProdutoSchema = new mongoose.Schema({
  nome: String,
  preco: Number,
  descricao: String,
  estoque: Number
})

module.exports = mongoose.model('Produto', ProdutoSchema)