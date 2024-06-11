import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { InvariantError } from '../exceptions/InvariantError.js';

// Mendefinisikan __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path untuk folder uploads
const uploadDir = path.join(__dirname, '../public/uploads');

// Membuat direktori 'public/uploads' jika belum ada
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const FILE_TYPE = {
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const validContentType = FILE_TYPE[file.mimetype];
    let returnError = new InvariantError('Invalid image type');

    if (validContentType) {
      returnError = null;
    } 

    cb(returnError, uploadDir);
  },
  filename: function (req, file, cb) {
    const sanitizedFilename = path.extname(file.originalname);
    const timestamp = Math.floor(Date.now() / 1000);
    const filename = `${file.fieldname}-${timestamp}${sanitizedFilename}`;
    cb(null, filename);
  }
});

export const upload = multer({ storage: storage, limits: { fileSize: 250 * 1024 }}); //250kb
