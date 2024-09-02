const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 1984;

// Configure CORS options
const corsOptions = {
    origin: process.env.FRONTEND_URI, 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true 
  };
  
  // Use CORS middleware
  app.use(cors(corsOptions));
  

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 
    limit: '20mb',
    extended: true 
}));

// Connect to MongoDB
mongoose.connect(process.env.CONNECTION_STRING, {
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

require("./src/routes")(app);
app.use('/public', express.static('public'));

app.listen(PORT, () => {
  const env = process.env.NODE_ENV;
    console.log('ok', env)
});