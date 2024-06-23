import { Request, Response, NextFunction } from "express";

/**
 * 
 * @param {Request} req Express request
 * @param {Response} res Express response
 * @param {NextFunction} next Express next function
 * @returns {Response | undefined} Express response
 */
function fileExists(req: Request, res: Response, next: NextFunction) {
    if(!req.files || !req.files.length) {
        return res.status(400).json({
            msg: "Missing files!"
        });
    }
    next();
}

export default fileExists;