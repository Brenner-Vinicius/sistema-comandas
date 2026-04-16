const ItemPedido = require('../models/ItemPedido')

exports.create = async (req, res) => {
  const item = await ItemPedido.create(req.body)
  res.json(item)
}

exports.list = async (req, res) => {
  const itens = await ItemPedido.find()
    .populate('produto')
    .populate('pedido')

  res.json(itens)
}