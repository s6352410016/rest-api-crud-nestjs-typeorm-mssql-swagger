import * as multer from 'multer';
import * as path from 'path';
import { uuid } from 'uuidv4';

export const options = {
    storage: multer.diskStorage({
        destination: path.join(process.cwd(), "./images"),
        filename: (req, file, cb) => {
            const fileExt = file?.mimetype?.split("/")[1];
            const newFileName = `${uuid()}.${fileExt}`;
            cb(null, newFileName);
        }
    }),
    fileFilter: (req, file, cb) => {
        if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg" || file.mimetype === "image/webp") {
            return cb(null, true);
        }
        return cb(new Error("This File Extension Is Not Valid."), false);
    }
}