import express from "express";
import bodyParser from 'body-parser';
import dotenv from "dotenv";
import cors from "cors";
import referalRoutes from "./routes/referralRoutes.js";

const app = express();
app.use(bodyParser.json());
dotenv.config();
app.use(cors());

const PORT = process.env.PORT || 5000;

app.use('/api', referalRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
