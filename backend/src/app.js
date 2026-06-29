import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import cors from "cors";
import { connectToSocket } from "./controllers/socketManager.js";
import userRoutes from "./routes/users.routes.js";


const app = express();
const server = createServer(app);
const io = connectToSocket(server);  


app.set("port", (process.env.PORT || 8000));
app.use(cors());
app.use(express.json({limit: "40kb"}));
app.use(express.urlencoded({limit: "40kb", extended: true}));

app.use("/api/v1/users", userRoutes);

// app.get("/home", (req, res) => {
//     return res.json({"hello" : "World"})
// });

const start = async () => {
    app.set("mongo_user");
    const connectionDB = await mongoose.connect("mongodb+srv://vcall0912:OrTFTaI2Kh6LEoOp@meetflow.kj6ts8x.mongodb.net/");
    console.log(`Mongo Connected Db Host: ${connectionDB.connection.host}`);
    server.listen(app.get("port"), () => {
        console.log("Listening");
    });
};

start();