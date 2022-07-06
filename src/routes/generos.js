const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();

const generosController = require('../controllers/generosController');

router.get('/describe', generosController.describe);

router.get('/', generosController.listAll);
router.get('/:id_genero', generosController.listOne);

router.post('/add', upload.none(), generosController.save);

router.get('/update/:id_genero', generosController.edit);
router.post('/update/:id_genero', upload.none(), generosController.update);

router.get('/delete/:id_genero', generosController.delete);

module.exports = router;