const router = require('express').Router()
const controller = require('../controllers/itemPedidoController')
const auth = require('../middlewares/auth')

router.post('/', auth, controller.create)
router.get('/', auth, controller.list)

module.exports = router