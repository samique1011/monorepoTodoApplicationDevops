import { todoSchema } from "@repo/schemas/zodSchemas";
import type { Request , Response , NextFunction } from "express"


export const todoSchemaValidation = (req : Request , res : Response , next : NextFunction) => {
    const response = todoSchema.safeParse(req.body);
    if(response.success){
        next()
    }
    else{
        return res.status(400).json({
            msg : "Bad_request"
        })
    }
}