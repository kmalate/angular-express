const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require("passport");
// const taskRoutes = require('./routes/tasks');
const app = express();
const port = 3000;

//127.0.0.1
//localhost
mongoose.connect('mongodb://127.0.0.1:27017/mydb', {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('MongoDB connection error:', error);
});

require("./models/user");
require("./config/passport")(passport);

app.use(cors()); //Enable CORS
app.use(express.json());
// app.use('/tasks', taskRoutes);
app.use(require("./routes"));
app.get('/', (req, res) => {
    res.send('Hello from Express!');
});
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});