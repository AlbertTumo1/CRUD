// const express = require("express");
// const bodyParser = require('body-parser');
// const path = require("path");

// const app = express();

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// app.use(express.static('public'));

// app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname,'./public/form.html'));
// });

// app.post('/add-info', (req, res) => {
//     const { name, age } = req.body;
//     console.log('Data:', name , age);
//     res.redirect('/');
// });

// app.listen(3000, () => console.log("Example is running on port 3000"));

const mongoose = require('mongoose');
const connectionString = 'mongodb+srv://AlbertTumo:xboxones@tumocrud.f6doipk.mongodb.net/sample_mflix';

mongoose.connect(connectionString);

const sessionSchema = new mongoose.Schema({
    full_name: String,
    email_address:String,
    city:String,
    country:String
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));

db.once('open', async () => {
    console.log('Connected to MongoDB!');

    await mongoose.connection.db.collection("sessions").insertOne({name: "Albert"});

    const sessions = await mongoose.connection.db.collection("sessions").find().toArray();

    console.log(sessions)

    mongoose.connection.close();
});