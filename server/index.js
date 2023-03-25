import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import mongoose from "mongoose";

/* CONFIGURATION */
dotenv.config({});
const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000;

mongoose
    .connect(`${process.env.MONGO_URI}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(async () => {
        app.listen(PORT, () => console.log("listening on port " + PORT));
    })
    .catch((error) => {
        console.log(`${error} didn't connect`);
        process.exit(1);
    });
