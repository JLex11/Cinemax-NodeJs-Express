const express = require('express');
const router = express.Router();
const multer = require('multer');

const peliculasController = require('../controllers/peliculasController');
const imagesActions = require('../utils/imagesActions');

const thumbail = imagesActions.thumbail({ route: '/public/thumbails/peliculas/' });

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

router.post('/add', upload.single('foto'), thumbail, peliculasController.save);

router.get('/delete/:id_pelicula', peliculasController.delete);

router.get('/update/:id_pelicula', peliculasController.edit);
router.post('/update/:id_pelicula', upload.single('foto'), thumbail, peliculasController.update);

module.exports = router;
