import { Request, Response, NextFunction } from "express";

/**
 * 
 * @param {Request} req Express request
 * @param {Response} res Express response
 * @param {NextFunction} next Express next function
 * @returns {Response | undefined} Express response
 */
function fileExists(req: Request, res: Response, next: NextFunction) {
    const files = req.files as Express.Multer.File[];
    if(!files || !files.length) {
        return res.status(400).json({
            msg: "Missing files!"
        });
    }
    if(files && files.length > 5) {
        return res.status(422).json({
            msg: "Too many files!"
        });
    }
    next();
}

export default fileExists;