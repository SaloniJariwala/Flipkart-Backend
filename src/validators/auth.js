const { check, validationResult } = require('express-validator');

exports.validateSignupRequest = [
    check('firstName')
        .notEmpty()
        .withMessage('First Name is required'),
    check('lastName')
        .notEmpty()
        .withMessage('Last Name is required'),
    check('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Email format is not valid'),
    check('username')
        .notEmpty()
        .withMessage('Username is required'),
    check('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 character long')
];

exports.validateSigninRequest = [
    check('email')
        .notEmpty()
        .withMessage('Email is required'),
    check('password')
        .notEmpty()
        .withMessage('Password is required')
];

exports.isRequestValidated = (req, res, next) => {
    const errors = validationResult(req);
    if(errors.array().length > 0) {
        return res.status(400).json({ error: errors.array()[0].msg })
    }
    next();
};

