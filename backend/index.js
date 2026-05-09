import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import incomesRoutes from "./Routes/incomesRoutes.js"
import expensesRoutes from "./Routes/expensesRoutes.js"
import goalsRoutes from "./Routes/goalsRoutes.js"
import userRoutes from "./Routes/usersRoutes.js"


dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
const PORT = process.env.PORT || 3000;

if(process.env.MONGO_URI){
    mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log("Connect to MongoDB")
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    }).catch((err) => {
        console.log("MongoDb connection error", err)
    
    })
  
}

app.use("/incomes", incomesRoutes)

app.use("/expenses", expensesRoutes)

app.use("/goals", goalsRoutes)

app.use("/auth", userRoutes)
