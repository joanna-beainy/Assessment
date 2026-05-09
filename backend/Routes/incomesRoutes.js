import express from "express";
import { auth } from "../Middleware/auth.js";
import { createIncome, deleteIncome, getIncomes } from "../Controllers/incomesComtroller.js";

const router = express.Router();

router.get("/", auth, getIncomes);
router.post("/", auth, createIncome);
router.delete("/:id", auth, deleteIncome);

export default router;