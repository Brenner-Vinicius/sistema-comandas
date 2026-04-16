const router = require('express').Router()
const controller = require('../controllers/produtoController')
const auth = require('../middlewares/auth')

router.post('/', auth, controller.create)
router.get('/', auth, controller.list)

module.exports = router