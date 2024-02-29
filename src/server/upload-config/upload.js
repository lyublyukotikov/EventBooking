// upload.js

import multer from 'multer';
import path from 'path';
import fs from "fs"

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
  
// Путь к папке, куда вы хотите сохранить файлы
const dir = path.join(process.cwd(), '../../albums');
    cb(null, dir);
    // Создание папки, если она не существует
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

export default upload;