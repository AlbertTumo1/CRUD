const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require("path");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

const connectionString = 'mongodb+srv://AlbertTumo:xboxones@tumocrud.f6doipk.mongodb.net/sample_mflix';
mongoose.connect(connectionString);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname,'./public/form.html'));
});

app.post('/add-user', async (req, res) => {
    const { name, age, email } = req.body;
    console.log('Data:', name , age);

    db.once("open", async () => {
        try {
            console.log("Connected to MongoDB!");
            const user = await mongoose.connection.db.collection("test_users").insertOne({ name, email, age });
            res.json(user)
        } catch (error) {
            console.log(error)
        } finally {
            mongoose.connection.close();
            console.log("Closed Connection");
        }
    })

    res.redirect('/');
});

app.listen(3000, () => console.log("Example is running on port 3000"));