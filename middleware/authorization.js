const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = async (req, res, next) => {
    try {
        
        // Destructure the token
        const jwtToken = req.header('token');

        if(!jwtToken)
            return res.status(403).json("Not authorize");

        // Check if the token is valid
        const payload = jwt.verify(jwtToken, process.env.JWT_SECRET);

        req.user = payload.user;

        next();
    } catch (err) {
        console.error(err.message);
        res.status(403).json("Not authorize");
    }
}