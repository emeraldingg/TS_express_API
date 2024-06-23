import { Request, Response, NextFunction } from "express";
import path from "path";
const allowedExtensions = ["png", "jpg", "jpeg"];

interface MiddlewareFunction {
    (req: Request, res: Response, next: NextFunction): Response | undefined;
}
/**
 * 
 * @returns {Function} Middleware function
 */
function fileExtensionLimiter(): MiddlewareFunction {
    return (req: Request, res: Response, next: NextFunction): Response | undefined => {
        const files = req.files as Express.Multer.File[];

        const fileExtensions: string[] = [];
        files?.forEach((file: Express.Multer.File) => {
            fileExtensions.push(path.extname(file.originalname));
        });

        const allowedFiles = fileExtensions.every((extension: string) => {
            allowedExtensions.includes(extension);
        });

        if(!allowedFiles) {
            const msg = `Upload failed. Only ${allowedExtensions.toString()} files allowed.`.replaceAll(",", ", ");
            return res.status(422).json({ msg });
        }

        next();
    };
}

export default fileExtensionLimiter;