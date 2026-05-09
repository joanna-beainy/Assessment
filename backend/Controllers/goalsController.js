import mongoose from "mongoose";
import Goal from "../Models/Goal.js";

export async function getGoals(req, res){
    try{
        const userId = req.user?.id;
        if (!userId) return res.status(401).json({ error: "Invalid token/user" });

        const goals = await Goal.find({owner: userId}).sort({createdAt: -1});
        return res.status(200).json(goals);
    } catch(error){
        console.log(error);
        res.status(500).json({error: "Failed to fetch goals"});
    }
}

export async function createGoal(req, res){
    try{
        const userId = req.user?.id;
        if (!userId) return res.status(401).json({ error: "Invalid token/user" });

        const { name, amount} = req.body;
        if(!name || !amount){
            res.status(400).josn({error: "all fields are required"});
        }

        const newGoal = new Goal({
            name, 
            amount,
            owner: new mongoose.Types.ObjectId(userId)
        });

        const error = newGoal.validateSync();
        if(error){
            console.log(error);
            return res.status(400).json({error: "Failed to validate goal"});
        }

        await newGoal.save();
        res.status(201).json({message: "Goal created successfully ", newGoal});
    } catch(error){
        console.log(error);
        res.status(500).json({error: "Failed to create goal"});
    }
}

export async function deleteGoal(req, res){
    try{
         const userId = req.user?.id;
        if (!userId) return res.status(401).json({ error: "Invalid token/user" });

        const goalId = req.params.id;
        const deletedGoal = await Goal.findOneAndDelete({_id: goalId, owner: userId});
        if(!deletedGoal){
            res.status(404).json({error: "Goal noe found or unauthorized "});
        }

        res.status(200).json({message: "Goal deleted successfully", deletedGoal});
    } catch(error){
        console.log(error);
        res.status(500).json({error: "Failed to delete goal"});
    }
}