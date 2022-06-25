const express = require('express');
const router = express.Router();

const estadisticasController = require('../controllers/estadisticasController');

router.get('/', estadisticasController.listAll);
router.get('/:idestadisticas', estadisticasController.listOne);

router.post('/add', estadisticasController.save);

router.get('/delete/:idestadisticas', estadisticasController.delete);

router.get('/update/:idestadisticas', estadisticasController.edit);
router.post('/update/:idestadisticas', estadisticasController.update);

module.exports = router;
