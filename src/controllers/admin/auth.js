const User = require('../../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerAdmin = async (req, res) => {

    const existingAdmin = await User.findOne({ email: req.body.email });

    if (existingAdmin) {
        return res.status(400).json({
            message: "Admin Already Exist"
        });
    } else {
        const hash_password = await bcrypt.hash(req.body.password, 10);
        const newAdmin = await User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hash_password,
            username: req.body.username,
            role: "Admin"
        });

        if (newAdmin) {
            return res.status(200).json({
                message: "Admin Registered Successful"
            })
        } else {
            return res.status(400).json({
                message: "Something went Wrong"
            })
        }
    }
};

const loginAdmin = async (req, res) => {
    const admin = await User.findOne({ email: req.body.email });

    if (!admin) {
        return res.status(404).json({
            message: "Admin Not Found"
        })
    } else {
        const encPassword = await bcrypt.compare(req.body.password, admin.password);
        if (encPassword && admin.role === 'Admin') {
            const token = jwt.sign(
                {
                    _id: admin._id,
                    role: admin.role
                },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );
            res.cookie('token', token, { expiresIn: '1h' });
            res.status(200).json({
                token,
                user: {
                    _id: admin._id,
                    firstName: admin.firstName,
                    lastName: admin.lastName,
                    email: admin.email,
                    role: admin.role,
                    fullName: `${admin.firstName} ${admin.lastName}`
                }
            });
        } else {
            return res.status(400).json({
                message: "Wrong Password"
            });
        }
    }
};

const signOut = async (req, res) => {

    res.clearCookie('token');
    res.status(200).json({
        message: "Signout Successfully"
    });
}

module.exports = { registerAdmin, loginAdmin, signOut };