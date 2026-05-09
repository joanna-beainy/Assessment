import { useExpenseStore } from "../Stores/ExpenseStore";
function Expenses() {
    const { expenses, description, amount , setDescription , setAmount, saveExpense, deleteExpense} = useExpenseStore();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        saveExpense(description, amount);
    };
  return (
    <div className="bg-white p-6 shadow-sm flex flex-col gap-2" >
        <h1 className="font-bold text-xl">Expenses</h1>
        <div>
            <form onSubmit={handleSubmit} className="flex gap-2">
                <input 
                type="text" 
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="flex-1 border border-gray-200 px-2 py-3 rounded-ld"
                />
                <input 
                type="number" 
                placeholder="Amount"
                value={amount}
                onChange = {(e) => setAmount(Number(e.target.value))}
                className="flex-1 border border-gray-200 px-2 py-3 rounded-lg"
                />
                <button type="submit" className="bg-slate-800 px-2 py-2 text-white rounded-md">
                    Add
                </button>
            </form>
        </div>

        <div>
            {expenses.map((expense) => (
                <div className="flex justify-between ">
                    <h2 className="text-gray-500 text-sm">{expense.description}</h2>
                    <div className="flec gap-2">
                        <p className="font-bold text-md">{expense.amount}</p>
                        <button 
                            onClick={() => deleteExpense(expense._id)}
                            className="bg-white text-gray-400 hover: text-red-500">
                            remove
                        </button>

                    </div>

                </div>
            ))}
        </div>
    </div>
  )
}

export default Expenses;