const express = require('express');
const router = express.Router();
const comandaController = require('../controllers/comandaController');

// Verifique se os nomes das funções (list, create, etc) batem com o seu comandaController.js
router.get('/', comandaController.list);
router.post('/', comandaController.create);
router.put('/:id', comandaController.update);
router.delete('/:id', comandaController.delete);

module.exports = router;