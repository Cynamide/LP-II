const express = require('express');
const connectDb = require('./db/db.js');
const studentRoutes = require('./routes/routes.js');

const app = express();

const PORT = 3000;

const DB_URL = 'mongodb://root:root@localhost:27017/?authSource=admin';
// const DB_URL = 'mongodb://localhost:27017';

connectDb(DB_URL);

app.set('view engine', 'ejs')

app.use(express.static('public'))

app.use('/students', studentRoutes);   

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});