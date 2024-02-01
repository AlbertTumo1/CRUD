const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require("path");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

const mascots = [
    { name: 'Sammy', organization: "DigitalOcean", birth_year: 2012},
    { name: 'Tux', organization: "Linux", birth_year: 1996},
    { name: 'Moby Dock', organization: "Docker", birth_year: 2013}
];

const connectionString = 'mongodb+srv://AlbertTumo:xboxones@tumocrud.f6doipk.mongodb.net/sample_mflix';

app.get("/", (req, res) => {
    mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });

    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'Connection error:'));

    db.once("open", async () => {
        try {
            console.log("Connected to MongoDB getting theaters!");
            const users = await mongoose.connection.db.collection("test_users").find().toArray();
            res.render("../public/form.ejs", {users});
        } catch (error) {
            console.log(error)
        } finally {
            mongoose.connection.close();
            console.log("Closed Connection");
        }
    })
});

app.post('/add-user', async (req, res) => {
    const { name, age, email } = req.body;
    console.log('Data:', name , email, age);

    mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });

    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'Connection error:'));

    db.once("open", async () => {
        try {
            console.log("Connected to MongoDB!");
            const user = await mongoose.connection.db.collection("test_users").insertOne({ name, email, age });
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