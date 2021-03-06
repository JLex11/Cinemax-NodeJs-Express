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
router.get('/:id_pelicula', peliculasController.listOne);

router.post('/add', upload.single('foto'), peliculasController.save);

router.get('/update/:id_pelicula', peliculasController.edit);
router.post('/update/:id_pelicula', upload.single('foto'), peliculasController.update);

router.get('/delete/:id_pelicula', peliculasController.delete);

module.exports = router;
