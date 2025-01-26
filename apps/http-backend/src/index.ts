import express from "express";
import z from "zod";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./utils/config";
import { middleware } from "./middleware";

const app = express();

export const userInterface = z.object({
    email: z.string({required_error: "Email field is requireed."}).email(),
    password: z.string({required_error: "Password field is required."}).min(6),
})

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/signup", (req, res) => {
    const {success, data} = userInterface.safeParse(req.body);
    
    if(!success) {
        res.status(400).json({error: data, msg: "Invalid input"});
    }

    console.log(data);
});

app.post("/signin", (req, res) => {
    const {success, data} = userInterface.safeParse(req.body);
    
    if(!success) {
        res.status(400).json({error: data, msg: "Invalid input"});
    }

    const token = jwt.sign({email: data?.email, id: 1}, JWT_SECRET);

    res.status(200).json({token});
});

app.post("/room",middleware,  (req, res) => {
    res.send("Room created!");
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});