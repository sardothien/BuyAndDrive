import multer from 'multer';
import util from 'util';
export const uploadFile = util.promisify(multer({
  dest: 'uploads/',
  fileFilter: function (req: any, file: any, cb: any) {
    const allowedTypes:string[]=['image/png','image/gif','image/jpeg','image/bmp']
    if (allowedTypes.includes(file.mimetype)) 
    {
        return cb(null, true);
    } else {
        cb(null, false);
    }
  }
}).single('file'));
