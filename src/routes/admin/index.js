const express = require('express');
const router = express.Router();
const { registerAdmin, loginAdmin, signOut } = require('../../controllers/admin/auth');
const { requireLogin } = require('../../middlewares/common');
const { validateSignupRequest, validateSigninRequest, isRequestValidated } = require('../../validators/auth');

router.route('/sign-in').post(validateSigninRequest, isRequestValidated, loginAdmin);
router.route('/sign-up').post(validateSignupRequest, isRequestValidated, registerAdmin);
router.route('/sign-out').post(signOut);

router.route('/profile').post(requireLogin, (req, res) => {
    res.status(200).json({
        user: "Profile"
    });
});

module.exports = router;