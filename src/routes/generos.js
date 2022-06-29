const express = require('express');
const router = express.Router();

const generosController = require('../controllers/generosController');

router.get('/describe', generosController.describe);

router.get('/', generosController.listAll);
router.get('/:id_genero', generosController.listOne);

router.post('/add', generosController.save);

router.get('/delete/:id_genero', generosController.delete);

router.get('/update/:id_genero', generosController.edit);
router.post('/update/:id_genero', generosController.update);

module.exports = router;