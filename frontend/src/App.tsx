// src/App.tsx
import { useState } from "react";
import { useAuthStore } from "./Stores/AuthStore";
import LoginPage from "./Components/LoginPage";
import RegisterPage from "./Components/RegisterPage";
import Incomes from "./Components/Incomes";
import Expenses from "./Components/Expenses";
import Goals from "./Components/Goals";
import { useIncomeStore } from "./Stores/IncomeStore";
import { useExpenseStore } from "./Stores/ExpenseStore";
import { useGoalstore } from "./Stores/GoalStore";

export default function App() {
  const { user, token } = useAuthStore();
  const [showRegister, setShowRegister] = useState(false);

  const { incomes } = useIncomeStore();
  const { expenses } = useExpenseStore();
  const { goals } = useGoalstore();

  const totalIncome = incomes.reduce((sum, i) => sum + i.amount, 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const savings = totalIncome - totalExpenses;

  const currentGoal = goals.length > 0 ? goals[0] : null;
  const monthsToGoal =
    currentGoal && savings > 0
      ? Math.ceil(currentGoal.amount / savings)
      : null;

  if (!token || !user) {
    return showRegister ? (
      <RegisterPage onToggle={() => setShowRegister(false)} />
    ) : (
      <LoginPage onToggle={() => setShowRegister(true)} />
    );
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Home Page: Finance Tracker</h1>

      <div className="grid grid-cols-4 gap-6 mb-6">
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="font-semibold">Income</h2>
          <p className="text-xl">${totalIncome.toFixed(2)}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="font-semibold">Expenses</h2>
          <p className="text-xl">${totalExpenses.toFixed(2)}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="font-semibold">Savings</h2>
          <p className="text-xl">${savings.toFixed(2)}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="font-semibold">Goal</h2>
          {currentGoal ? (
            <p className="text-xl">
              {currentGoal.name} – ${currentGoal.amount.toFixed(2)}
            </p>
          ) : (
            <p className="text-gray-500">No goal set</p>
          )}
        </div>
      </div>


      {currentGoal && monthsToGoal && (
        <div className="mb-6 text-gray-700">
          About {monthsToGoal} months to reach target
        </div>
      )}

      <div className="grid grid-cols-2 gap-6 mb-6">
        <Incomes />
        <Expenses />
      </div>


      <Goals />
    </div>
  );
}
