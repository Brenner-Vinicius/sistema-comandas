const router = require('express').Router()
const controller = require('../controllers/pedidoController')
const auth = require('../middlewares/auth')

router.post('/', auth, controller.create)
router.get('/', auth, controller.list)
router.put('/:id', auth, controller.update)
router.delete('/:id', auth, controller.delete)

module.exports = router