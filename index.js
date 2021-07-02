const express = require('express');
const cors = require('cors');
const app = express()

// Middlewares
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3001;

// Routes
// Login an register routes

app.use('/auth', require('./routes/jwtAuth'));

app.use('/dashboard', require('./routes/dashboard'));

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})
