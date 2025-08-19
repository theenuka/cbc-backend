import order from "../models/order.js";
import { isCustomer } from "./userController.js";
import Product from "../models/product.js";

export async function createOrder(req, res) {

    if(!isCustomer(req)){
        res.json({
            message:"Please login as customer to create orders"
        })
        return
    }
    //cbc0001
    //take the lates product id
    try{
        const latestOrder = await order.findOne().sort({ date: -1 }).limit(1)

        let orderId

        if(latestOrder == null){
            orderId="cbc0001"
        }else{
            const currentOrderId=latestOrder.orderId
            const numberString=currentOrderId.replace("cbc","")
            const number=parseInt(numberString)
            const newNumber=(number+1).toString().padStart(4, '0')
            orderId="cbc" + newNumber

        }

        const newOrderData=req.body

   

        const newProductArray = []
        for(let i=0;i<newOrderData.orderedItems.length;i++){
            const product=await Product.findOne({
                productId: newOrderData.orderedItems[i].productId
            })
        }

        if(product==null){
            res.status(400).json({
                message: "Product with id" + newOrderData.orderedItems[i].productId + " not found"
            })
            return
        }

        newProductArray[i]={
            name: product.ProductName,
            productId: product.productId,
            quantity: newOrderData.orderedItems[i].quantity,
            price: product.price,
            image: product.images[0]
        }

        console.log(newProductArray)
        newOrderData.orderedItems=newProductArray

        newOrderData.orderId=orderId
        newOrderData.email=req.user.email

        const newOrder= new order(newOrderData)
        await newOrder.save()

        res.status(201).json({
            message: "Order created successfully",
            
        })
    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }




}

export async function getOrders(req, res) {
    try {
        // If user is admin, return all orders
        // If user is customer, return only their orders
        let orders;
        
        if (req.user && req.user.type === "admin") {
            orders = await order.find({});
        } else if (req.user && req.user.email) {
            orders = await order.find({ email: req.user.email });
        } else {
            return res.status(401).json({ 
                message: "Please login to view orders" 
            });
        }
        
        res.status(200).json({ 
            orders: orders,
            count: orders.length 
        });
    } catch (error) {
        res.status(500).json({ 
            message: error.message 
        });
    }
}