const express = require('express');
const router = express.Router();
const multer = require('multer');

const actoresController = require('../controllers/actoresController');
const imagesActions = require('../utils/imagesActions');

const thumbail = imagesActions.thumbail({ route: '/public/thumbails/actores/' });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/public/fotos/actores/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

router.get('/describe', actoresController.describe);

router.get('/', actoresController.listAll);
router.get('/:id_actor', actoresController.listOne);

router.post('/add', upload.single('foto'), thumbail, actoresController.save);

router.get('/delete/:id_actor', actoresController.delete);

router.get('/update/:id_actor', actoresController.edit);
router.post('/update/:id_actor', upload.single('foto'), thumbail, actoresController.update);

module.exports = router;
