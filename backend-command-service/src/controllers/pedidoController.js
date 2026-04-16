const Pedido = require('../models/Pedido')
const Comanda = require('../models/Comanda')

exports.create = async (req, res) => {
  const comanda = await Comanda.findById(req.body.comanda)

  if (!comanda.aberta) {
    return res.status(400).json({ error: 'Comanda fechada' })
  }

  const pedido = await Pedido.create(req.body)
  res.json(pedido)
}

exports.list = async (req, res) => {
  const pedidos = await Pedido.find().populate('comanda')
  res.json(pedidos)
}

exports.update = async (req, res) => {
  const pedido = await Pedido.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.json(pedido)
}

exports.delete = async (req, res) => {
  await Pedido.findByIdAndDelete(req.params.id)
  res.json({ message: 'Pedido removido' })
}