import mongoose from "mongoose";

const productschema = mongoose.Schema({
    name: String,
    price: Number,
    description: String
})
const Product = mongoose.model("product",productschema)

export default Product