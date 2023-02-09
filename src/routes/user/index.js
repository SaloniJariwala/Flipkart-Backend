const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../../controllers/user/auth');
const { requireLogin } = require('../../middlewares/common');
const { validateSignupRequest, validateSigninRequest, isRequestValidated } = require('../../validators/auth');

router.route('/sign-in').post(validateSigninRequest, isRequestValidated, loginUser);
router.route('/sign-up').post(validateSignupRequest, isRequestValidated, registerUser);

router.route('/profile').post(requireLogin, (req, res) => {
    res.status(200).json({
        user: "Profile"
    });
});

module.exports = router;