import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";

export function middleware(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.headers["authorization"];
    
        const decoded = jwt.verify(token as string, JWT_SECRET) as jwt.JwtPayload;
    
        if(!decoded) {
            res.status(401).json({msg: "Unauthorized"});
        }
    
        req.userId = decoded.id;
    
        next();
    } catch (error) {
        res.status(401).json({msg: "Unauthorized"});
        
    }
}