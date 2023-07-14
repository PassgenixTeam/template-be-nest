import { Request } from 'express';
import { diskStorage, memoryStorage } from 'multer';

const storageDisk = diskStorage({
  destination: function (
    _req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void,
  ) {
    if (file.fieldname === 'files') return cb(null, './public/uploads');
    return cb(null, './public/results');
  },
  filename: function (
    _req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void,
  ) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '.' + file.originalname.split('.').pop());
  },
});

const storageMemory = memoryStorage();

const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: (error: Error | null, acceptFile: boolean) => void,
): void => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'video/mp4'
  ) {
    cb(null, true);
  } else {
    cb(
      new Error(
        'File format is not supported. Only upload .png, .jpg, .jpeg, .mp4 file format. Please try again!',
      ),
      false,
    );
  }
};

export const multerDiskOption = {
  storage: storageDisk,
  fileFilter,
};

export const multerMemoryOption = {
  storage: storageMemory,
  fileFilter,
};
