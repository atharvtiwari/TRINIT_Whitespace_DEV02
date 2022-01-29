// Import npm packages
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const routes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 3001;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/trinit_db', {
    useNewUrlParser: true,
	useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
	console.log('Mongoose is connected');
});

// Data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/bugtracker', routes);

app.listen(PORT, console.log(`Server running at http://localhost:${PORT}`));