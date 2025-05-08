import express from "express";
import { handleIncomingMessage } from "../controllers/messageController.js";
import { validateOportunity } from "../middlewares/validateOportunity.js";

const router = express.Router();

router.post("/", validateOportunity, handleIncomingMessage);
router.get("/", async (_req, res) =>
  res.status(200).json({ message: "API is running" })
);

export default router;
