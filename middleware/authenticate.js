const jwt = require("jsonwebtoken");
const userdb = require("../models/userSchema");
// const keysecret = process.env.SECRET_KEY
const keysecret = "mynameisramannagariamawebdeveloper";

const verifyToken=(req, resp, next)=>{
    let token = req.headers['authorization'];
    if(token){
        token = token.split(' ')[1];
        jwt.verify(token, keysecret, (err, valid)=>{
            if(err){
                resp.status(401).send({result:"please provide valid token"})
            }else{
                next();
            }
        })
    }else{
        resp.status(403).send({result:"please add token with header"})
    }
}


module.exports = verifyToken