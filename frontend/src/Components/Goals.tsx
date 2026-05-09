import { useGoalstore } from "../Stores/GoalStore"
function Goals() {
    const { goals, name, amount, setName, setAmount, saveGoal, deleteGoal} = useGoalstore();
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        saveGoal(name, amount);
    };
  return (
    <div className="bg-white p-6 shadow-sm flex flex-col gap-2" >
        <h1 className="font-bold text-xl">Savings Goal</h1>
        <div>
            <form onSubmit={handleSubmit} className="flex gap-2">
                <input 
                type="text" 
                placeholder=".e.g Emergency fund"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="flex-1 border border-gray-200 px-2 py-3"
                />
                <input 
                type="number" 
                placeholder="Target"
                value={amount}
                onChange = {(e) => setAmount(Number(e.target.value))}
                className="flex-1 border border-gray-200 px-2 py-3"
                />
                <button type="submit" className="bg-slate-800 px-2 py-2">
                    Set
                </button>
            </form>
        </div>

        <div>
            {goals.map((goal) => (
                <div className="flex justify-between ">
                    <p className="text-gray-500 text-sm">{goal.name} - ${goal.amount}</p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Goals