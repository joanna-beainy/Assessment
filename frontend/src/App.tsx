import './App.css'
import Expenses from './Components/Expenses'
import Incomes from './Components/Incomes'
import Goals from './Components/Goals'
import RegisterPage from './Components/RegisterPage'
import { useIncomeStore } from './Stores/IncomeStore'
import { useExpenseStore } from './Stores/ExpenseStore'
import { useGoalstore } from './Stores/GoalStore'

const {incomes }= useIncomeStore();
const {expenses} = useExpenseStore();
const {goals} = useGoalstore();


const totalIncome = incomes.reduce((sum, i) => sum + i.amount, 0);
const totalExpences = expenses.reduce((sum, e) => sum + e.amount, 0);
const savings = totalIncome - totalExpences;

  
function App() {
  


  return (
      <div className="min-h-screen bg-gray-50 p-6">
          <div className="mt-6 mx-auto max-w-[1000px] flex flex-col gap-6 lg:flex-row">
                <div className="flex-1 flex flex-col gap-6 ">
                   <Incomes/>
                   <Goals/>
                </div>

                <div className="flex-1">
                    <Expenses/>
                </div>
            </div>
      </div>
  )
}

export default App
