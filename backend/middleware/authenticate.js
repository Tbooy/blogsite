import Author from "../models/authorModel.js";
import jwt from 'jsonwebtoken'

const authenticate = async(req, res, next) => {
    const {authorization}= req.headers;
    if (!authorization){
        return res.status(401).json({error:"You must be logged in to access this route"});

    }
// to verify the id with the token generated 
    const token = authorization.split(" ")[1];
    try{
        const {id} = jwt.verify(token, process.env.JWT_SECRET);
        const author = await Author.findById(id).select("_id");

        if(!author){
            return res.status(404).json({error:"You must be logged in to access this route"});
        }

        req.author= author;

        next();

    }catch(error){
        return res.status(404).json({error:"You must be logged in to access this route"})
    }
}
 
export default authenticate;