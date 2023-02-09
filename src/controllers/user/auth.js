const User = require('../../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {

    const existingUser = await User.findOne({email: req.body.email});

    if (existingUser) {
        return res.status(400).json({
            message: "User Already Exist"
        });
    } else {
        const hash_password = await bcrypt.hash(req.body.password, 10);
        const newUser = await User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hash_password,
            username: req.body.username,
            role: "User"
        });

        if (newUser) {
            return res.status(200).json({
                message: "User Registered Successful"
            })
        } else {
            return res.status(400).json({
                message: "Something went Wrong"
            })
        }
    }
};

const loginUser = async (req, res) => {
    const user = await User.findOne({email: req.body.email});

    if (!user) {
        return res.status(404).json({
            message: "User Not Found"
        })
    } else {
        if (bcrypt.compare(req.body.password, user.password) && user.role === 'User') {
            const token = jwt.sign(
                {
                    _id: user._id,
                    role: user.role
                },
                process.env.JWT_SECRET,
                {expiresIn: '1h'}
            );
            res.status(200).json({
                token,
                user: {
                    _id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    role: user.role,
                    fullName: `${user.firstName} ${user.lastName}`
                }
            });
        } else {
            return res.status(400).json({
                message: "Wrong Password"
            });
        }
    }
};

module.exports = {registerUser, loginUser};