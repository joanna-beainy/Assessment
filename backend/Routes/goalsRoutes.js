import express from "express"
import { auth } from "../Middleware/auth.js";
import { createGoal, deleteGoal, getGoals } from "../Controllers/goalsController.js";

const router = express.Router();

router.get("/", auth, getGoals);
router.post("/", auth, createGoal);
router.delete("/:id", auth, deleteGoal);

export default router;