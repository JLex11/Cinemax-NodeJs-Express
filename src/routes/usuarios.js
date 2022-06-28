const express = require('express');
const router = express.Router();

const usuariosController = require('../controllers/usuariosController');

router.get('/describe', usuariosController.describe);

router.get('/', usuariosController.listAll);
router.get('/:user', usuariosController.listOne);

router.post('/add', usuariosController.save);

router.get('/delete/:user', usuariosController.delete);

router.get('/update/:user', usuariosController.edit);
router.post('/update/:user', usuariosController.update);

module.exports = router;