import { useIncomeStore } from "../Stores/IncomeStore"
function Incomes() {
    const {incomes, source, amount , setSource, setAmount, saveIncome, deleteIncome } = useIncomeStore();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        saveIncome(source, amount); 
    };
  return (
    <div className="bg-white p-6 shadow-sm flex flex-col gap-2" >
        <h1 className="font-bold text-xl">Incomes</h1>
        <div>
            <form onSubmit={handleSubmit} className="flex gap-2">
                <input 
                type="text" 
                placeholder="Source"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className="flex-1 border border-gray-200 px-2 py-3 rounded-lg"
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
            {incomes.map((income) => (
                <div className="flex justify-between ">
                    <h2 className="text-gray-500 text-sm">{income.source}</h2>
                    <div className="flec gap-2">
                        <p className="font-bold text-md">{income.amount}</p>
                        <button 
                            onClick={() => deleteIncome(income._id)}
                            className="bg-white text-gray-400  hover: text-red-500">
                            remove
                        </button>

                    </div>

                </div>
            ))}
        </div>


        
    </div>
  )
}

export default Incomes