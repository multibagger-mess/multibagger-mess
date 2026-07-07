const jwt = require("jsonwebtoken");

const adminLogin = async (req, res) => {

    const { username, password } = req.body;

    if (
        username !== process.env.ADMIN_USERNAME ||
        password !== process.env.ADMIN_PASSWORD
    ) {
        return res.status(401).json({
            success: false,
            message: "Invalid username or password",
        });
    }

    const token = jwt.sign(
        {
            role: "admin",
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d",
        }
    );

    res.json({
        success: true,
        token,
    });

};

module.exports = {
    adminLogin,
};