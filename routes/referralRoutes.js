import express from "express";
const router = express.Router();

import { createReferral } from "../controllers/referralControllers.js";

router.post("/referrals", createReferral)


export default router;