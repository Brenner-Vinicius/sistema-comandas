const Mesa = require('../models/Mesa')

exports.create = async (req, res) => {
  const mesa = await Mesa.create(req.body)
  res.json(mesa)
}

exports.list = async (req, res) => {
  const mesas = await Mesa.find()
  res.json(mesas)
}

exports.update = async (req, res) => {
  const mesa = await Mesa.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.json(mesa)
}

exports.delete = async (req, res) => {
  await Mesa.findByIdAndDelete(req.params.id)
  res.json({ message: 'Mesa removida' })
}