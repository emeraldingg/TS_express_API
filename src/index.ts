import express, { Express, Request, Response } from "express";
import fs from "fs";
import path from "path";

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
function getRandomImage (): Image {
    return images[Math.floor(Math.random() * images.length)];
}

const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = 3000;

// app.get("/", (req: Request, res: Response) => {
//     return res.send("Hello World");
// });

app.get("/", (req: Request, res: Response) => {
    const img = getRandomImage();
    if(img) {
        res.type(img.extension);
        return res.send(img.data);
    }
    return res.status(404).send("No image found :(");
});

app.listen(PORT, () => {
    console.log(`Now listening on PORT ${PORT}!`);
});