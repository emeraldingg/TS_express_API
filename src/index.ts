import express, { Express, Request, Response } from "express";
const app: Express = express();
const PORT = 3000;

app.get("/", function (req: Request, res: Response) {
    res.send("Hello World");
});

app.listen(PORT, () => {
    console.log(`Now listening on PORT ${PORT}!`);
});