const Produto = require('../models/Produto')

exports.create = async (req, res) => {
  const produto = await Produto.create(req.body)
  res.json(produto)
}

exports.list = async (req, res) => {
  const produtos = await Produto.find()
  res.json(produtos)
}

exports.update = async (req, res) => {
  const produto = await Produto.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.json(produto)
}

exports.delete = async (req, res) => {
  await Produto.findByIdAndDelete(req.params.id)
  res.json({ message: 'Produto removido' })
}