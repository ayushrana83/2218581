import express, { Request, Response } from "express";
import dotenv from "dotenv";
import {connectDB} from "../src/Config/db";
import urlRoutes from "../src/Routes/urlRoutes"
import cors from "cors";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());

app.use(express.json());

app.use("/shorturls" , urlRoutes)

connectDB();


app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
