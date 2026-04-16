const router = require('express').Router()
const controller = require('../controllers/pagamentoController')
const auth = require('../middlewares/auth')

router.post('/', auth, controller.create)
router.get('/', auth, controller.list)
router.delete('/:id', auth, controller.delete)

module.exports = router