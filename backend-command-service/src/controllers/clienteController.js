const Cliente = require('../models/Cliente')

exports.create = async (req, res) => {
  const cliente = await Cliente.create(req.body)
  res.json(cliente)
}

exports.list = async (req, res) => {
  const clientes = await Cliente.find()
  res.json(clientes)
}

exports.update = async (req, res) => {
  const cliente = await Cliente.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.json(cliente)
}

exports.delete = async (req, res) => {
  await Cliente.findByIdAndDelete(req.params.id)
  res.json({ message: 'Cliente removido' })
}