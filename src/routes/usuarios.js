const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();

const usuariosController = require('../controllers/usuariosController');

router.get('/describe', usuariosController.describe);

router.get('/', usuariosController.listAll);
router.get('/:user', usuariosController.listOne);

router.post('/add', upload.none(), usuariosController.save);

router.get('/delete/:user', usuariosController.delete);

router.get('/update/:user', usuariosController.edit);
router.post('/update/:user', upload.none(), usuariosController.update);

module.exports = router;