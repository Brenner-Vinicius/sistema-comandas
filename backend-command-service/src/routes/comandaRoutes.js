const router = require('express').Router()
const controller = require('../controllers/comandaController')
const auth = require('../middlewares/auth')

router.post('/', auth, controller.create)
router.get('/', auth, controller.list)
router.get('/:id', auth, controller.getById)
router.put('/:id', auth, controller.update)
router.delete('/:id', auth, controller.delete)

module.exports = router