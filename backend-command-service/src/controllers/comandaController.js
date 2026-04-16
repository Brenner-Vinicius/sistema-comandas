const Comanda = require('../models/Comanda')
const Pedido = require('../models/Pedido')

// CREATE
exports.create = async (req, res) => {
  const comanda = await Comanda.create(req.body)
  res.json(comanda)
}

// LIST
exports.list = async (req, res) => {
  const comandas = await Comanda.find()
  res.json(comandas)
}

// GET BY ID
exports.getById = async (req, res) => {
  const comanda = await Comanda.findById(req.params.id)
  const pedidos = await Pedido.find({ comanda: req.params.id })

  res.json({ ...comanda.toObject(), pedidos })
}

// UPDATE
exports.update = async (req, res) => {
  const comanda = await Comanda.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  )
  res.json(comanda)
}

// DELETE
exports.delete = async (req, res) => {
  await Comanda.findByIdAndDelete(req.params.id)
  res.json({ message: 'Comanda removida' })
}