import express, { Express, Request, Response } from "express";
import fs from "fs";
import path from "path";

let img: Buffer | null = null;
const imageFiles = fs.readdirSync("./src/img")?.filter(file => /\.(jpg|jpeg|png)$/i.test(file));
if (imageFiles.length > 0) {
    img = fs.readFileSync(path.join("./src/img", imageFiles[0]));
} else {
    console.log("No files found in the directory.");
}

const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = 3000;

// app.get("/", (req: Request, res: Response) => {
//     return res.send("Hello World");
// });

app.get("/", (req: Request, res: Response) => {
    if(img) {
        res.type("png");
        return res.send(img);
    }
    return res.status(404).send("No image found :(");
});

app.listen(PORT, () => {
    console.log(`Now listening on PORT ${PORT}!`);
});