const jwt = require("jsonwebtoken");
const { JsonWebTokenError } = require("jsonwebtoken");

const getUserByToken = (token)=> { 
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
            if(err) {
                return reject(err)
            }
            resolve(user)
        })
    })
 }
const auth = async (req, res, next) => {
 const headers = req.headers;
 const check_token = headers.accesstoken;
 if(!(check_token && check_token.startsWith("Bearer"))) {
     return res.status(400).send("Invalid Access.")
 }

 const token = check_token.split(" ")[1]
let user ;
try {
    user = await getUserByToken(token)
    req.user = user.user
} catch (error) {
    return res.
    status(400).
    send("Invalid token.")
}
return next()
}

module.exports = auth