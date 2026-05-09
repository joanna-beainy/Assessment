import { create } from "zustand";
import axios from "axios";
import type { Goal } from "../Types/types.ts"

const API_URL = "http://localhost:3000/goals";

function authHeaders() {
  const token = localStorage.getItem("token");
  return { headers: { Authorization: `Bearer ${token}` } };
}

interface GoalStore {
    goals: Goal[];
    name: string;
    amount: number;

    setName: (name: string) => void;
    setAmount: (amount: number) => void;

    fetchGoals: () => void;
    saveGoal: (name: string, amount: number) => void;
    deleteGoal: (id: string) => void;

}

export const useGoalstore =  create<GoalStore>((set, get) => ({
    goals: [],
    name: "",
    amount: 0,

    setName: (name) => set({name}),
    setAmount: (amount) => set({amount}),

    fetchGoals: async () => {
        try{
            const res = await axios.get(API_URL, authHeaders());
            set({ goals: res.data});
        } catch(error){
            console.log("Error fetching goals", error);
        }
    },

    saveGoal: async (name, amount) => {
        try{
            const {fetchGoals} = get();

            await axios.post(API_URL, {name, amount}, authHeaders());

            await fetchGoals();
            set({ name: "", amount: 0});
        } catch(error) {
            console.log("Error saving goal", error);
        }
    },

    deleteGoal: async (id) => {
        try{
            await axios.delete(`${API_URL}/${id}`, authHeaders());
            await get().fetchGoals();
        } catch( error ){
            console.log("Error deleting goals", error);
        }
    }
}))
