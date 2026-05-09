import User from "../Models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const saltRounds = 10;

export async function register(req, res) {
    try {
        const { name, email, password } = req.body;
        if(!name || !email || !password){
            return res.status(400).json({error: "All fields are required"})
        } 
        const existing = await User.findOne({email: email});
        if(existing){
            return res.status(400).json({error: "Email already exists, please login"})
        }

        const hashedPassword = await bcrypt.hashSync(password, saltRounds);
        const created = new User({
            name, 
            email, 
            password: hashedPassword
        });

        await created.save();

        const newUser  = {
            id: created._id.toString(),
            name: created.name,
            email: created.email,
        }
        res.status(201).json({success: true, message: "User created successfully", newUser})
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Something went wrong"})
    }

}

export async function login(req, res) {
    try {
        const { email, password } = req.body;
        if(!email || !password){
            return res.status(400).json({error: "All fields are required"})
        }
        const user = await User.findOne({email: email});
        if(!user){
            return res.status(400).json({error: `User does not exist!, please register`})
        }
        const authentication = await bcrypt.compare(password, user.password);
        if(!authentication){
            return res.status(401).send("Invalid credentials")
        }

        const safeUser = {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
        }

        const token = jwt.sign(
            {user: safeUser},
            process.env.JWT_SECRET,
            {expiresIn: "1h"}
        )

        res.status(200).json({ success: true, message: "User logged in successfully", safeUser, token})
    } catch (error) {
        res.status(500).json({error: "Something went wrong"})   
    }
}