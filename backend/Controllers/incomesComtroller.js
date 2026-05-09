import mongoose from "mongoose";
import Income from "../Models/Income.js";

export async function getIncomes(req, res){
    try{
        const userId = req.user?.id;
        if (!userId) return res.status(401).json({ error: "Invalid token/user" });

        const incomes =  await Income.find({ owner: userId}).sort({createdAt: -1});
        return res.status(200).json(incomes);
    } catch(error){
        console.log(error);
        res.status(500).json({error: "Failed to fetch incomes"});
    }
}

export async function createIncome(req, res){
    try{
        const userId = req.user?.id;
        if (!userId) return res.status(401).json({ error: "Invalid token/user" });

        const { source, amount } = req.body;
        if(!source || !amount){
            res.status(400).json({error: "All fields are required"});
        }

        const newIncome = new Income({
            source,
            amount,
            owner: new mongoose.Types.ObjectId(userId)
        });

        const error = newIncome.validateSync();
        if(error){
            console.log(error);
            return res.status(400).json({error: "Failed to validate income"});
        }

        await newIncome.save();
        res.status(201).json({message: "Income created successfully", newIncome});
    } catch(error){
        console.log(error);
        res.status(500).json({error: "Failed to create income"});
    }
}

export async function deleteIncome(req, res){
    try{
         const userId = req.user?.id;
        if (!userId) return res.status(401).json({ error: "Invalid token/user" });

        const incomeId = req.params.id;
        const deletedIncome =  await Income.findOneAndDelete({_id: incomeId, owner: userId});
        if(!deletedIncome){
            res.status(200).json({message: "Income not found or unauthorized"});
        }

        res.status(200).json({message: "Income deleted successfully", deleteIncome});
    } catch(error){
        console.log(error);
        res.status(500).json({error: "Failed to delete income"});
    }
}