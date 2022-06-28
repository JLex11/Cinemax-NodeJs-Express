const express = require('express');
const router = express.Router();
const multer = require('multer');
const peliculasController = require('../controllers/peliculasController');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/public/images/peliculas/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage: storage });

router.get('/describe', peliculasController.describe);

router.get('/', peliculasController.listAll);
router.get('/:idpelicula', peliculasController.listOne);

router.post('/add', upload.single('foto'), peliculasController.save);

router.get('/delete/:idpelicula', peliculasController.delete);

router.get('/update/:idpelicula', peliculasController.edit);
router.post('/update/:idpelicula', upload.single('foto'), peliculasController.update);

module.exports = router;
