import express from "express";
import { auth } from "../Middleware/auth.js";
import { createExpense, deleteExpense, getExpenses } from "../Controllers/expensesController.js";

const router = express.Router();

router.get("/", auth, getExpenses);
router.post("/", auth, createExpense);
router.delete("/:id", auth, deleteExpense);

export default router;