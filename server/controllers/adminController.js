const jwt = require("jsonwebtoken");

const adminLogin = async (req, res) => {

    const { username, password } = req.body;

    /* console.log("Body Username :", username);
    console.log("Body Password :", password);
    console.log("ENV Username  :", process.env.ADMIN_USERNAME);
    console.log("ENV Password  :", process.env.ADMIN_PASSWORD);
    console.log("---------------"); */ //This log used for testing

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
        { role: "admin" },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );

    res.json({
        success: true,
        token,
    });

};

module.exports = {
    adminLogin,
};