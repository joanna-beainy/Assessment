import { create } from "zustand";
import axios from "axios";
import type { Income } from "../Types/types.ts"

const API_URL = "http://localhost:3000/incomes";

function authHeaders() {
  const token = localStorage.getItem("token");
  return { headers: { Authorization: `Bearer ${token}` } };
}

interface IncomeStore {
    incomes: Income[];
    source: string;
    amount: number;

    setSource: (source: string) => void;
    setAmount: (amount: number) => void;

    fetchIncomes: () => void;
    saveIncome: (source: string, amount: number) => void;
    deleteIncome: (id: string) => void;

}

export const useIncomeStore =  create<IncomeStore>((set, get) => ({
    incomes: [],
    source: "",
    amount: 0,

    setSource: (source) => set({source}),
    setAmount: (amount) => set({amount}),

    fetchIncomes: async () => {
        try{
            const res = await axios.get(API_URL, authHeaders());
            set({ incomes: res.data});
        } catch(error){
            console.log("Error fetching incomes", error);
        }
    },

    saveIncome: async (source, amount) => {
        try{
            const {fetchIncomes} = get();

            await axios.post(API_URL, {source, amount}, authHeaders());

            await fetchIncomes();
            set({ source: "", amount: 0});
        } catch(error) {
            console.log("Error saving income", error);
        }
    },

    deleteIncome: async (id) => {
        try{
            await axios.delete(`${API_URL}/${id}`, authHeaders());
            await get().fetchIncomes();
        } catch( error ){
            console.log("Error deleting income", error);
        }
    }
}))
