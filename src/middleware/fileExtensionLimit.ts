import { Request, Response, NextFunction } from "express";
import path from "path";
const allowedExtensions = ["png", "jpg", "jpeg"];

/**
 * 
 * @param {Request} req Express request
 * @param {Response} res Express response
 * @param {NextFunction} next Express next function
 * @returns {Response | undefined} Express response
 */
function fileExtensionLimiter(req: Request, res: Response, next: NextFunction): Response | undefined {
    const files = req.files as Express.Multer.File[];

    const fileExtensions: string[] = [];
    files?.forEach((file: Express.Multer.File) => {
        fileExtensions.push(path.extname(file.originalname).replace(".",""));
    });

    const allowedFiles = fileExtensions.every((extension: string) => {
        return allowedExtensions.includes(extension);
    });

    if(!allowedFiles) {
        const msg = `Upload failed. Only ${allowedExtensions.toString()} files allowed.`.replaceAll(",", ", ");
        return res.status(422).json({ msg });
    }

    next();
}

export default fileExtensionLimiter;