const multer = require('multer');
const uuid = require('uuid');

const MIME_TYPE_MAP = {
    'image/jpeg':'jpeg',
    'image/jpg':'jpg',
    'image/png':'png',
}

const fileUpload = multer({
    limits: 500000,
    storage: multer.memoryStorage()
    // storage: multer.diskStorage({
    //     destination: (req,file,cb) => {
    //         cb(null,'uploads/images');
    //     },
    //     filename: (req,file,cb) => {
    //         const ext = MIME_TYPE_MAP[file.mimetype];
    //         cb(null,uuid.v1()+'.'+ext);
    //     },
    //     fileFilter: (req,file,cb) => {
    //         const isValid = !!MIME_TYPE_MAP[file.mimetype];
    //         let error = isValid ? null : new Error('Invalid MIME Type!');
    //         cb(error, isValid, )
    //     }
    // })
});

module.exports = fileUpload;