import mongoose from "mongoose";
import Expense from "../Models/Expense.js";

export async function getExpenses(req, res){
    try{
        const userId = req.user?.id;
        if (!userId) return res.status(401).json({ error: "Invalid token/user" });

        const expenses = await Expense.find({owner: userId}).sort({createdAt: -1});
        return res.status(200).json(expenses);
    } catch(error){
        console.log(error);
        res.status(500).json({error: "Failed to fetch expenses"});
    }
}

export async function createExpense(req, res){
    try{
        const userId = req.user?.id;
        if (!userId) return res.status(401).json({ error: "Invalid token/user" });
        
        const { description, amount } = req.body;
        if(!description || !amount){
            res.status(400).json({error: "All fields are required"});
        }

        const newExpense = new Expense({
            description,
            amount,
            owner: new mongoose.Types.ObjectId(userId)
        });
        
        const error = newExpense.validateSync();
        if(error){
            console.log(error);
            return res.status(400).json({error: "Failed to validate expense"});
        }

        await newExpense.save();
        res.status(201).json({message: "Expense created successfully", newExpense});
    } catch(error){
        console.log(error);
        res.status(500).json({error: "Failed to create expense"});
    }
}

export async function deleteExpense(req, res){
    try{
        const userId = req.user?.id;
        if (!userId) return res.status(401).json({ error: "Invalid token/user" });

        const expenseId = req.params.id;
        const deleetdExpense = await Expense.findOneAndDelete({_id: expenseId, owner: userId});
        if(!deleetdExpense){
            res.status(404).json({error: "Expense not found or unauthorized"});
        }  

        res.status(200).json({message: "Expense deleted successfully", deleetdExpense});
    } catch(error){
        console.log(error);
        res.status(500).json({error: "Failed to delete expense"});
    }
}