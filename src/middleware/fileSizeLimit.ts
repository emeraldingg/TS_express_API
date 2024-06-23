import { Request, Response, NextFunction } from "express";

const MB = 10;
const fileSizeLimit = MB * 1024 * 1024;
/**
 * 
 * @param {Request} req Express request
 * @param {Response} res Express response
 * @param {NextFunction} next Express next function
 * @returns {Response | undefined} Express response
 */
function fileSizeLimiter(req: Request, res: Response, next: NextFunction): Response | undefined {
    const filesOverLimit: string[] = [];
    const files = req.files as Express.Multer.File[];
    files?.forEach((file: Express.Multer.File) => {
        if(file.size > fileSizeLimit) {
            filesOverLimit.push(file.originalname);
        }
    });
    if(filesOverLimit.length) {
        const properVerb = filesOverLimit.length > 1 ? "are" : "is";

        const msg = `Upload failed. ${filesOverLimit.toString()} ${properVerb} over the file size limit of ${MB} MB.`.replaceAll(",", ", ");

        return res.status(413).json({ msg });
    }
    next();
}

export default fileSizeLimiter;