import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const auth = (req, res, next) => {

    const authHeader = req.headers["authorization"] || req.headers["Authorization"];
    if(!authHeader){
        return res.status(401).json({error: "Missing authorization header"})
    }

    const parts = authHeader.split(" ");
    if(parts.length !== 2 || parts[0] !== "Bearer"){
        return res.status(401).json({error: "Invalid authorization header format."})
    }

    const token = parts[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).json({error: "Invalid token"})
    }
}