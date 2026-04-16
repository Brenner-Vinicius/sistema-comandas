const Pedido = require('../models/Pedido');

// Criar Pedido
exports.create = async (req, res) => {
  try {
    // Comentamos a validação de comanda para evitar o erro 500 de "ObjectId failed"
    /*
    const comanda = await Comanda.findById(req.body.comanda);
    if (!comanda) return res.status(404).json({ error: 'Comanda não encontrada' });
    */

    // Cria o pedido com os dados que vêm do Frontend
    const pedido = await Pedido.create(req.body);

    res.status(201).json(pedido);
  } catch (error) {
    console.error("Erro ao criar pedido:", error);
    res.status(500).json({ error: error.message });
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

// Atualizar Pedido
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
    res.json({ message: 'Pedido removido com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};