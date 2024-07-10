// utils/fileUpload.ts
import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

// Set storage engine
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null,  file.originalname);
    }
});

const upload = multer({
    storage: storage,
});

export default upload;