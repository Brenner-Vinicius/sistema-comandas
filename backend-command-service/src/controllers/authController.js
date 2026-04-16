const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const SECRET = 'segredo'

exports.register = async (req, res) => {
  const hash = await bcrypt.hash(req.body.password, 10)
  const user = await User.create({ email: req.body.email, password: hash })
  res.json(user)
}

exports.login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email })

  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return res.status(401).json({ error: 'Credenciais inválidas' })
  }

  const token = jwt.sign({ id: user._id }, SECRET)
  res.json({ token })
}