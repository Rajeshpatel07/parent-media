import express from "express";
import cors from "cors";
import dotenv from 'dotenv'
import { PrismaClient } from "@prisma/client";
import router from "./routes/routes.js";
dotenv.config();

const app = express();
export const prisma = new PrismaClient();

app.use(express.json())
app.use(cors());
app.use('/api/v1', router)


const port = process.env.PORT || 8080

app.listen(port, () => console.log(`Server started at port ${port}`));
