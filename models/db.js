const mysql = require('mysql2');

// Create database connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
  });

// Connect to the database
db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err.message);
        process.exit(1);
    }
    console.log('MySQL connected...');

    // Create the items table if it does not exist
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS items (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            description TEXT,
            price DECIMAL(10, 2),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;
    db.query(createTableQuery, (err) => {
        if (err) {
            console.error('Failed to create items table:', err.message);
        } else {
            console.log('Items table ensured.');
        }
    });
});

module.exports = db;
