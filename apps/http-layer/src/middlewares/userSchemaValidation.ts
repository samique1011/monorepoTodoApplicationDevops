import {userSchema} from "@repo/schemas/zodSchemas"
import type { Request , Response , NextFunction } from "express"


export const userSchemaValidation = (req : Request , res : Response , next : NextFunction) => {
    const response = userSchema.safeParse(req.body);
    if(response.success){
        next();
    }
    else{
        return res.status(400).json({
            msg : "Bad request"
        })
    }
}