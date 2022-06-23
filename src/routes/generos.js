const express = require('express');
const router = express.Router();

const generosController = require('../controllers/generosController');

router.get('/', generosController.listAll);

router.post('/add', generosController.save);

router.get('/delete/:idgenero', generosController.delete);

router.get('/update/:idgenero', generosController.edit);
router.post('/update/:idgenero', generosController.update);

module.exports = router;