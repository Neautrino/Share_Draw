import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";

export function middleware(req: Request, res: Response, next: NextFunction) {
    const token = req.headers["authorization"];

    const decoded = jwt.verify(token as string, JWT_SECRET);

    if(!decoded) {
        res.status(401).json({msg: "Unauthorized"});
    }

    // @ts-ignore
    req.userId = decoded.id;
    // @ts-ignore
    req.email = decoded.username;

    next();
}