import multer from 'multer';
export const upload = multer({
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
});
