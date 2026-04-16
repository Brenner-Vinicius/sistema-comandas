const mongoose = require('./src/config/database');

const Pedido = require('./src/models/Pedido');
const Comanda = require('./src/models/Comanda');
const Cliente = require('./src/models/Cliente');
async function resetTotal() {
  try {
    console.log("⏳ Iniciando limpeza total do banco...");

    await Pedido.deleteMany({});
    console.log("✅ Pedidos apagados.");

    await Comanda.deleteMany({});
    console.log("✅ Comandas apagadas.");

    await Cliente.deleteMany({});
    console.log("✅ Clientes apagados.");

    console.log("\n🔥 BANCO DE DADOS LIMPO COM SUCESSO!");
  } catch (err) {
    console.error("❌ Erro ao limpar o banco:", err);
  } finally {
    process.exit();
  }
}

resetTotal();