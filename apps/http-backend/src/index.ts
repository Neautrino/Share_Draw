import express, { json } from "express";
import jwt from "jsonwebtoken";
import { middleware } from "./middleware";
import { JWT_SECRET } from "@repo/backend-common/config";
import { CreateUserSchema, SigninSchema } from "@repo/common/types";
import { prismaClient } from "@repo/db/client";

const app = express();
app.use(json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/signup",async (req, res) => {
    const {success, data} = CreateUserSchema.safeParse(req.body);
    
    if(!success) {
        res.status(400).json({error: data, msg: "Invalid input"});
        return;
    }

    try {
        const user = await prismaClient.user.create({
            data: {
                email: data?.email,
                password: data?.password,
                name: data?.name
            }
        })

        res.status(200).json({msg: "User created", userId: user.id}); 
    } catch (error) {
        res.status(500).json({error, msg: "Failed to create user"});
        
    }

    console.log(data);
});

app.post("/signin", (req, res) => {
    const {success, data} = SigninSchema.safeParse(req.body);
    
    if(!success) {
        res.status(400).json({error: data, msg: "Invalid input"});
        return;
    }

    const token = jwt.sign({email: data?.email, id: 1}, JWT_SECRET);

    res.status(200).json({token});
});

app.post("/room",middleware,  (req, res) => {

    const {success, data} = CreateUserSchema.safeParse(req.body);

    if(!success) {
        res.status(400).json({error: data, msg: "Invalid input"});
        return;
    }

    
    res.json({msg: "Room created", data});
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});