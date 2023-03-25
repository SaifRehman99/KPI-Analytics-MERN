import mongoose from "mongoose";
import { loadType } from "mongoose-currency";

const Schema = mongoose.Schema;
loadType(mongoose);

const ProductSchema = new Schema(
    {
        price: {
            type: mongoose.Types.Currency,
            currency: "USD",
            get: (v) => v / 100, // 8by 100 by mongo, islea / 100 to equal
        },
        expense: {
            type: mongoose.Types.Currency,
            currency: "USD",
            get: (v) => v / 100,
        },
        transactions: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Transactions",
            },
        ],
    },
    { timestamps: true, toJSON: { getters: true } }
);

const Product = mongoose.model("Product", ProductSchema);

export default Product;
