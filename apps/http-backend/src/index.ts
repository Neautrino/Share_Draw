import express from "express";
import jwt from "jsonwebtoken";
import { middleware } from "./middleware";
import { JWT_SECRET } from "@repo/backend-common/config";
import { CreateUserSchema, SigninSchema } from "@repo/common/types";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/signup", (req, res) => {
    const {success, data} = CreateUserSchema.safeParse(req.body);
    
    if(!success) {
        res.status(400).json({error: data, msg: "Invalid input"});
        return;
    }

    console.log(data);
});

app.post("/signin", (req, res) => {
    const {success, data} = SigninSchema.safeParse(req.body);
    
    if(!success) {
        res.status(400).json({error: data, msg: "Invalid input"});
        return;
    }

    const token = jwt.sign({username: data?.username, id: 1}, JWT_SECRET);

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