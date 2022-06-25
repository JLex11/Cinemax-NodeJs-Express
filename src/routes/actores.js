const express = require('express');
const router = express.Router();
const multer = require('multer');
const actoresController = require('../controllers/actoresController');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/public/images/actores/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage: storage });

router.get('/', actoresController.listAll);
router.get('/:idactor', actoresController.listOne);

router.post('/add', upload.single('foto'), actoresController.save);

router.get('/delete/:idactor', actoresController.delete);

router.get('/update/:idactor', actoresController.edit);
router.post('/update/:idactor', upload.single('foto'), actoresController.update);

module.exports = router;
