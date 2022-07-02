const express = require('express');
const router = express.Router();
const multer = require('multer');

const directoresController = require('../controllers/directoresController');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/public/images/directores/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

router.get('/describe', directoresController.describe);

router.get('/', directoresController.listAll);
router.get('/:id_director', directoresController.listOne);

router.post('/add', upload.single('foto'), directoresController.save);

router.get('/delete/:id_director', directoresController.delete);

router.get('/update/:id_director', directoresController.edit);
router.post('/update/:id_director', upload.single('foto'), directoresController.update);

module.exports = router;
