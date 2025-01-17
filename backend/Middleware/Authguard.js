const jwt = require('jsonwebtoken');
const env = require('dotenv');
env.config();

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    console.log(token);

    if (!token) {
        return res.status(403).json({
            success: false,
            message: "Token is required for authentication"
        })
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, details) => {
        console.log(process.env.JWT_SECRET);
        // console.log(details);
        if (err) {

            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({
                    success: false,
                    message: "Token expired"
                })
            }
            console.log(err);
            return res.status(401).json({
                success: false,
                message: "Invalid token"
            })
        }
        console.log(details);
        req.body.user = details;
        next();
    });

}

module.exports = { verifyToken }