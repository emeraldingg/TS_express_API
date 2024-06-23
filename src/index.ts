import express, { Express, Request, Response } from "express";
import multer from "multer";
import fs from "fs";
import path from "path";

import fileExtensionLimiter from "./middleware/fileExtensionLimit.js";
import fileSizeLimiter from "./middleware/fileSizeLimit.js";
import fileExists from "./middleware/fileExists.js";

interface Image {
    data: Buffer;
    extension: string;
}
const images: Image[] = [];
const imageFiles = fs.readdirSync("./src/img")?.filter(file => /\.(jpg|jpeg|png)$/i.test(file));
if (imageFiles.length > 0) {
    imageFiles.forEach((imgFilename: string) => {
        const imgPath = path.join("./src/img", imgFilename);
        images.push({
            data: fs.readFileSync(imgPath),
            extension: path.extname(imgPath),
        });
    });
} else {
    console.log("No files found in the directory.");
}

/**
 * 
 * @returns {Image} Random image with data and extension
 */
function getRandomImage(): Image {
    return images[Math.floor(Math.random() * images.length)];
}

const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = 3000;

app.get("/image", (req: Request, res: Response) => {
    const img = getRandomImage();
    if(img) {
        res.type(img.extension);
        return res.send(img.data);
    }
    return res.status(404).send("No image found :(");
});


app.get("/", (req: Request, res: Response) => {
    res.sendFile(path.resolve("./src/", "index.html"));
});

const MB = 10;
const fileSizeLimit = MB * 1024 * 1024;
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        files: 10,
        fileSize: fileSizeLimit,
        parts: 20
    },
});
app.post("/upload",
    upload.array("uploadedFiles", 5),
    fileExists,
    fileExtensionLimiter,
    fileSizeLimiter,
    (req: Request, res: Response) => {
        console.log(req);
        return res.json({
            msg: `${req.files?.length} files received!`
        });
    }
);


app.listen(PORT, () => {
    console.log(`Now listening on port ${PORT}!`);
});