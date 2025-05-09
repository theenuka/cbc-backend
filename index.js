import express from 'express';
const app=express();
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import student from './models/student.js';
import studentRouter from './routes/studentRouter.js';
import productRouter from './routes/productRouter.js';
import userRouter from './routes/userRouter.js';
import jwt from 'jsonwebtoken';


const mongourl="mongodb+srv://admin:123@cluster0.suda2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(mongourl,{})
const connection = mongoose.connection;
connection.once("open",()=>{
    console.log("Database connected");
});

app.use(bodyParser.json());  

app.use(
    (req,res,next)=>{
        const token = req.header("authorization")?.replace("Bearer ","")
        console.log(token)

        if(token != null){
            jwt.verify(token,"cbc-secret-key-7973",(error,decoded)=>{
                if(!error){
                    console.log(decoded)
                    req.user = decoded
                }
        })
    }
    next()
}
)


    app.use("/api/students",studentRouter);
    app.use("/api/products",productRouter);
    app.use("/api/users",userRouter);


app.listen(
    3000,
    ()=>{
    console.log("Server is running at port 3000");
}
);



