const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authenticate = require('./Routes/auth');
const app = express();

dotenv.config();
app.use(cors() )
app.use(express.json());

const port = process.env.PORT || 7600;
const uri = process.env.ATLAS_URI;

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Successfully established connection to mongoDB');
})

const userRoutes = require('./Routes/users');
const postRoutes = require('./Routes/posts');
app.use('/login', userRoutes);
app.use('/posts', authenticate, postRoutes);

app.listen( port, () => {
    console.log(`Server is running on port:${ port }`);
});