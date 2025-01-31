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

app.post("/signup", async (req, res) => {
    const { success, data } = CreateUserSchema.safeParse(req.body);

    if (!success) {
        res.status(400).json({ error: data, msg: "Invalid input" });
        return;
    }

    try {
        const user = await prismaClient.user.create({
            data: {
                email: data?.email,
                password: data?.password,
                name: data?.name
            }
        });

        res.status(200).json({ msg: "User created", userId: user.id });
    } catch (error: any) {
        if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
            res.status(409).json({ msg: "User with this email already exists" });
            return;
        }
        res.status(500).json({ error, msg: "Failed to create user" });
    }

});

app.post("/signin", async (req, res) => {
    const { success, data } = SigninSchema.safeParse(req.body);

    if(!success) {
        res.status(400).json({ error: data, msg: "Invalid input" });
        return;
    }

    try {
        const user = await prismaClient.user.findUnique({ where: { email: data?.email } });
        if(!user) {
            res.status(404).json({ msg: "User not found" });
            return;
        }

        if(user.password !== data?.password) {
            res.status(401).json({ msg: "Invalid password" });
            return;
        }

        const token = jwt.sign({ email: user?.email, id: user.id }, JWT_SECRET);
        res.status(200).json({ msg: "User signed in", userId: user.id, token });
            
    } catch (error: any) {
        res.status(500).json({ msg: "Internal server error" });
    }
});

app.post("/room", middleware, (req, res) => {

    const { success, data } = CreateUserSchema.safeParse(req.body);

    if (!success) {
        res.status(400).json({ error: data, msg: "Invalid input" });
        return;
    }


    res.json({ msg: "Room created", data });
});

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});