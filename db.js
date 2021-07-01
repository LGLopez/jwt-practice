const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'postgres',
    password: '655361',
    host: 'localhost',
    port: 5432,
    database: 'jwt_test'
});

module.exports = pool;