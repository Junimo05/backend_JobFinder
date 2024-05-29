import { diskStorage } from "multer";
import path from "path";

export const storageConfig = (folder: string) => {
    return diskStorage({
            destination: (req, file, cb) => {
                cb(null, `../uploads/${folder}`);
            },
            filename: (req, file, cb) => {
                cb(null, Date.now() + '-' + (file.originalname));
            }
        })
    }
