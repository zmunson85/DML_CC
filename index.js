const express = require('express');
const connectDB = require('./config/db')
const path = require('path');
const app = express();

//connect the Database
connectDB();

//middleware
app.use(express.json({ extended: false }));

//api routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/superHeros', require('./routes/superHeros'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));