import cookieParser from "cookie-parser";
import express from "express";
import morgan from "morgan";
import cors from "cors";

import userRouter from "./routes/user.route.js"
import noteRouter from "./routes/note.route.js"

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser())
app.use(cors({ origin: "*" }));

// Routes
app.use("/api/user", userRouter)
app.use("/api/note", noteRouter)


export default app;
