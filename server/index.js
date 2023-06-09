import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import mongoose from "mongoose";
import kpisRoutes from "./routes/kpi.js";
import productsRoutes from "./routes/products.js";
import transactionsRoutes from "./routes/transaction.js";

import Product from "./models/Product.js";
import KPI from "./models/KPI.js";
import Transaction from "./models/Transaction.js";

import { kpis, products, transactions } from "./data/data.js";

/* CONFIGURATION */
dotenv.config({});
const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));

app.get("/", (req, res) => {
    res.send("Express on Vercel");
});

/* ROUTES */
app.use("/kpi", kpisRoutes);
app.use("/product", productsRoutes);
app.use("/transaction", transactionsRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000;

mongoose
    .connect(`${process.env.MONGO_URI}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(async () => {
        app.listen(PORT, () => console.log("listening on port " + PORT));

        // before seed, drop current db, so no duplicate
        // await mongoose.connection.db.dropDatabase();
        // KPI.insertMany(kpis);
        // Product.insertMany(products);
        // Transaction.insertMany(transactions);
    })
    .catch((error) => {
        console.log(`${error} didn't connect`);
        process.exit(1);
    });
