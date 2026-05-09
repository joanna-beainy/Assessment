import { create } from "zustand";
import axios from "axios";
import type { Expense } from "../Types/types.ts"

const API_URL = "http://localhost:3000/expenses";

function authHeaders() {
  const token = localStorage.getItem("token");
  return { headers: { Authorization: `Bearer ${token}` } };
}

interface ExpenseStore {
    expenses: Expense[];
    description: string;
    amount: number;

    setDescription: (description: string) => void;
    setAmount: (amount: number) => void;

    fetchExpenses: () => void;
    saveExpense: (description: string, amount: number) => void;
    deleteExpense: (id: string) => void;

}

export const useExpenseStore =  create<ExpenseStore>((set, get) => ({
    expenses: [],
    description: "",
    amount: 0,

    setDescription: (description) => set({description}),
    setAmount: (amount) => set({amount}),

    fetchExpenses: async () => {
        try{
            const res = await axios.get(API_URL, authHeaders());
            set({ expenses: res.data});
        } catch(error){
            console.log("Error fetching expenses", error);
        }
    },

    saveExpense: async (description, amount) => {
        try{
            const {fetchExpenses} = get();

            await axios.post(API_URL, {description, amount}, authHeaders());

            await fetchExpenses();
            set({ description: "", amount: 0});
        } catch(error) {
            console.log("Error saving expense", error);
        }
    },

    deleteExpense: async (id) => {
        try{
            await axios.delete(`${API_URL}/${id}`, authHeaders());
            await get().fetchExpenses();
        } catch( error ){
            console.log("Error deleting income", error);
        }
    }
}))
