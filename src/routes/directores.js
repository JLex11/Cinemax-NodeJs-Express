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

router.get('/', directoresController.listAll);
router.get('/:iddirector', directoresController.listOne);

router.post('/add', upload.single('foto'), directoresController.save);

router.get('/delete/:iddirector', directoresController.delete);

router.get('/update/:iddirector', directoresController.edit);
router.post('/update/:iddirector', upload.single('foto'), directoresController.update);

module.exports = router;
