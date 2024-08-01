import mysql from 'mysql';

// Create the connection to the database
export const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456', // Ensure the password is a string
  database: 'ecommerce'
});

// Connect to the database
db.connect(function(err) {
  if (err) {
    console.error('[mysql error]', err);
  } else {
    console.log('Connected to the database!');
  }
});

// To handle errors after the initial connection, you can add an error listener
db.on('error', function(err) {
  console.error('[mysql error]', err);
});
