import * as dotenv from "dotenv";
import express from "express";
import mysql from 'mysql2';
import * as bodyParser from "body-parser";
import { articleRouter } from "./routes/articleRouter";
import { commentRouter } from "./routes/commentRouter";

const app = express();
dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use("/articles", articleRouter);
app.use("/comments", commentRouter);

app.route("/ping").get((req, res) => {
    res.status(200).send({
        message: "pong",
        "status": "Success"
    })
})

app.listen(process.env.PORT, () => {
console.log(`APP is now running on Port ${process.env.PORT}`);
});

module.exports = app