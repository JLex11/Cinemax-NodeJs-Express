const express = require('express');
const router = express.Router();

const estadisticasController = require('../controllers/estadisticasController');

router.get('/describe', estadisticasController.describe);

router.get('/', estadisticasController.listAll);
router.get('/:id_estadisticas', estadisticasController.listOne);

router.post('/add', estadisticasController.save);

router.get('/delete/:id_estadisticas', estadisticasController.delete);

router.get('/update/:id_estadisticas', estadisticasController.edit);
router.post('/update/:id_estadisticas', estadisticasController.update);

module.exports = router;
