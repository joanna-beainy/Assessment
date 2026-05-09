import { useAuthStore } from "../Stores/AuthStore";

function RegisterPage() {

    const { name, email, password, setName, setEmail, setPassword, register} = useAuthStore();
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        register();
    };

  return (
    <div className="flex justify-center items-center h-screen ">
        <div className="max-w-lg bg-white shadow-md p-8">
            <h1 className="text-2xl font-bold mb-2">Finance Tracker</h1>
            <p className="text-gray-400 mb-6">Sign in to your account</p>

            <div className="flex mb-6 border-b gap-3">
                <button className="py-2 text-gray-400 hover text-black-800">Login</button>
                <button className="py-2 text-gray-400 hover text-black-800">Register</button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input 
                    type="text" 
                    placeholder="Username"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border rounded-md px-3 py-2 "
                />
                <input 
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border rounded-md outline-none px-3 py-2 "
                 />
                 <input 
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border rounded-md px-3 py-2 "
                  />
                  <button type="submit" className="w-full bg-slate-800 text-white py-2 rounded-md hover: bg-black-900">
                    Create Account
                  </button>
            </form>
        </div>
        
    </div>
        
  )
}

export default RegisterPage