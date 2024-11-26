const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
    if (!token) {
        return res.status(401).json({
            message: "no token provided", status: "failed"
        });
    }

    try {
        const decoded = jwt.verify(token, 'SECRET_KEY');
        req.user = decoded;
        next();

    } catch (error) {
        return res.status(401).json({
            message: "failed to authenticate token",
            status: "failed",
            error: error.message
        });


    }
};


module.exports = verifyToken
