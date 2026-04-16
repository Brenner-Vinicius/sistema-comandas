const Pedido = require('../models/Pedido');

// Criar Pedido
exports.create = async (req, res) => {
  try {
    // IMPORTANTE: Removemos toda a lógica de buscar comanda e checar se está 'aberta'
    // O pedido será criado direto com os dados enviados pelo Frontend
    const pedido = await Pedido.create(req.body);

    console.log("Sucesso: Pedido gravado no MongoDB!");
    return res.status(201).json(pedido);
  } catch (error) {
    console.error("Erro ao criar pedido:", error);
    return res.status(500).json({ error: error.message });
  }
};

// Listar Pedidos
exports.list = async (req, res) => {
  try {
    const pedidos = await Pedido.find();
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Atualizar Pedido (Status, etc)
exports.update = async (req, res) => {
  try {
    const pedido = await Pedido.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(pedido);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Deletar Pedido
exports.delete = async (req, res) => {
  try {
    await Pedido.findByIdAndDelete(req.params.id);
    res.json({ message: 'Pedido removido' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};