import express from "express"
import cors from "cors"
import jwt from "jsonwebtoken"

import type { Request , Response , NextFunction } from "express";
import { userSchemaValidation } from "./middlewares/userSchemaValidation.js";
import {prisma} from "@repo/db/prisma"
import { todoSchemaValidation } from "./middlewares/todoSchemaValidation.js";
import { userAuthentication } from "./middlewares/userAuthentication.js";


const app = express();
app.use(express.json());
app.use(cors());

app.post("/signup" , userSchemaValidation , async (req : Request , res : Response) => {
    try{
        const {username , password} = req.body;
        await prisma.user.create({
            data : {
                username ,
                password
            }
        })

        res.status(200).json({
            msg : "User_created_successfully"
        })
    }catch(e : any){
        if(e.code == "P2002"){
            res.status(409).json({
                msg : "Username_already_exists"
            })
        }

        res.status(500).json({
            msg : "Internal_Server_error"
        })
    }
})

app.post("/signin" , userSchemaValidation , async (req : Request , res : Response) => {
    try{
        const {username , password} = req.body;
        const checkUser = await prisma.user.findFirst({
            where : {
                username , 
                password
            } , 
            select : {
                id : true
            }
        })
        if(checkUser){
            const token = jwt.sign({id : checkUser.id , username : username} , "12");
            console.log("Token gave back = " , token);
            res.status(200).json({
                msg : "signed in successfully" ,
                id : checkUser.id ,
                token : token
            })
        }
        else{
            res.status(404).json({
                msg : "User_doesnt_exists"
            })
        }
    }catch(e){
        res.status(500).json({
            msg : "Internal_server_error"
        })
    }
})


app.post("/addTodo" , userAuthentication , todoSchemaValidation , async (req : Request , res : Response) => {
    try{
        const {title , description} = req.body;
        const userId = req.body.userId
        await prisma.todo.create({
            data : {
                userId : userId,
                title : title ,
                description : description
            }
        })

        res.status(200).json({
            msg : "Todo_inserted_successfully"
        })
    }catch(e){
        res.status(500).json({
            msg : "Internal Server error"
        })
    }
})

app.post("/getTodos" , userAuthentication , async (req : Request , res : Response) => {
    try{
        const userId = req.body.userId;
        const allTodos = await prisma.todo.findMany({
            where : {
                userId : userId
            } , 
            select : {
                title : true,
                description : true
            }
        })

        res.status(200).json({
            allTodos
        })
    }catch(e){
        res.status(500).json({
            msg : "Internal server error"
        })
    }
})

app.listen(5000 , () => {
    console.log("App is listening")
})


