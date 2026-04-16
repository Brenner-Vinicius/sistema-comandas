const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const SECRET = 'segredo'

exports.register = async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!senha) {
      return res.status(400).json({ error: 'A senha não foi enviada' });
    }

    const hash = await bcrypt.hash(senha, 10);
    const user = await User.create({ email, password: hash });
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;
    const user = await User.findOne({ email });

    // Mudamos aqui também para .senha
    if (!user || !(await bcrypt.compare(senha, user.password))) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const token = jwt.sign({ id: user._id }, SECRET);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}