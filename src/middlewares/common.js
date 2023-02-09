const jwt = require('jsonwebtoken');

const requireLogin = (req, res, next) => {
    if(req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        req.user = jwt.verify(token, process.env.JWT_SECRET);
    } else {
        return res.status(400).json({
            message: "Authorization Required"
        })
    }
    next();
};

const  userMiddleware = (req, res, next) => {
    if(req.user.role !== 'User') {
        return res.status(400).json({
            message: "User Access denied"
        })
    }
    next();
};

const  adminMiddleware = (req, res, next) => {
    if(req.user.role !== 'Admin') {
        return res.status(400).json({
            message: "Admin Access denied"
        })
    }
    next();
};

module.exports = { requireLogin, adminMiddleware, userMiddleware };