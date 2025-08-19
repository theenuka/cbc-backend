import Product from "../models/product.js";
import { isAdmin } from "./userController.js";

export function createProduct(req, res) {
    if(!isAdmin(req)){
        res.json({
            message: "Please login as administrator to add products"
        })
        return
    }

    const newProduct=req.body;
    const product = new Product(newProduct);
    product.save().then(()=>{
        res.json({
            message: "Product created"
        })
    }).catch((error)=>{
        res.json({
            message: error
        })
    })
}

export function getProducts(req, res) {
    Product.find({}).then((products)=>{
        res.json(products)
    })
}