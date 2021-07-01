const router = require('express').Router();
const pool = require('../db');
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator');

// Registering
router.post('/register', async (req, res) => {
    try {
        // get everything from body
        const {name, email, password} = req.body;
        
        // Check if user exists
        const user = await pool.query(`SELECT * FROM users WHERE user_email='${email}'`);
        
        if (user.rows.length !== 0)
            return res.status(401).send("User already exists")  // 401 status means unathorized
        

        // bcrypt the password
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);

        const bcryptPassword = await bcrypt.hash(password, salt);

        // add new user to db
        const newUser = await pool.query(`INSERT INTO users(user_name, user_email, user_password) VALUES('${name}', '${email}', '${bcryptPassword}') RETURNING *`);

        // generate the JWT token
        const token = jwtGenerator(newUser.rows[0].user_id);
        
        res.json({token});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
} )

module.exports = router;