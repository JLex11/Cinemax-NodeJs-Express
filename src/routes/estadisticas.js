const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();

const estadisticasController = require('../controllers/estadisticasController');

router.get('/describe', estadisticasController.describe);

router.get('/', estadisticasController.listAll);
router.get('/:id_estadisticas', estadisticasController.listOne);

router.post('/add', upload.any(), estadisticasController.save);

router.get('/update/:id_estadisticas', estadisticasController.edit);
router.post('/update/:id_estadisticas', upload.any(), estadisticasController.update);

router.get('/delete/:id_estadisticas', estadisticasController.delete);

module.exports = router;
