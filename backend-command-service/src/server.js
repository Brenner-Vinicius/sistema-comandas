const express = require('express');
const cors = require('cors');

require('./config/database');

// 👇 IMPORTANTE: Aqui é onde as rotas são definidas (O que estava faltando)
const authRoutes = require('./routes/authRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const produtoRoutes = require('./routes/produtoRoutes');
const pedidoRoutes = require('./routes/pedidoRoutes');
const itemPedidoRoutes = require('./routes/itemPedidoRoutes');
const mesaRoutes = require('./routes/mesaRoutes');
const pagamentoRoutes = require('./routes/pagamentoRoutes');
const comandaRoutes = require('./routes/comandaRoutes');

const app = express();

// 👇 MIDDLEWARES
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// 👇 USO DAS ROTAS
app.use('/api/auth', authRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/produtos', produtoRoutes);
app.use('/api/pedidos', pedidoRoutes);
app.use('/api/itens', itemPedidoRoutes);
app.use('/api/mesas', mesaRoutes);
app.use('/api/pagamentos', pagamentoRoutes);
app.use('/api/comandas', comandaRoutes);

module.exports = app;