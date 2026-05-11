import type { Request , Response , NextFunction } from "express"
import jwt, { JwtPayload } from "jsonwebtoken"

export const userAuthentication = (req : Request , res : Response , next : NextFunction) => {
    try{
        const token = req.headers.authorization as string;
        console.log(token);
        const decoded = jwt.verify(token , "12") as JwtPayload;
        req.body.userId = decoded.id;
        next();
    }catch(e){
        return res.status(401).json({
            msg : "Invalid_token"
        })
    }
}