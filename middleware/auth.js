import jwt from "jsonwebtoken";

export function auth(req, res, next){
    const token = req.header("Authorization");
    if(!token)
        return res.status(401).send("No token");
    try {
        const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_PRIVATE_KEY);
        req.user = decoded;
        next();
    } catch(err){
        res.status(401).send("Invalid token");
    }
}