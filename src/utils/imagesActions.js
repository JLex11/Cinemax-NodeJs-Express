const sharp = require('sharp');
const controller = {};

controller.thumbail = (config) => {
    let route = config.route;
    return (req, res, next) => {
        let filename = req.file.filename.split('.').shift();
        route = `${route + filename}.webp`;
        sharp(req.file.path)
            .resize(100)
            .toFormat('webp')
            .webp({ quality: 30 })
            .toFile(`src${route}`);
        req.body.thumbail = route;
        next();
    };
};

module.exports = controller;