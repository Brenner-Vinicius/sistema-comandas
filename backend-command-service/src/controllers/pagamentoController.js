const Pagamento = require('../models/Pagamento')

exports.create = async (req, res) => {
  const pagamento = await Pagamento.create(req.body)
  res.json(pagamento)
}

exports.list = async (req, res) => {
  const pagamentos = await Pagamento.find().populate('pedido')
  res.json(pagamentos)
}

exports.delete = async (req, res) => {
  await Pagamento.findByIdAndDelete(req.params.id)
  res.json({ message: 'Pagamento removido' })
}