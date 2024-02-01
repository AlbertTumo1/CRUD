const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require("path");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

const connectionString = 'mongodb+srv://AlbertTumo:xboxones@tumocrud.f6doipk.mongodb.net/sample_mflix';

app.get("/", (req, res) => {
    mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Connection error:'));

    db.once("open", async () => {
        try {
            console.log("Connected to MongoDB getting All Products!");
            const products = await mongoose.connection.db.collection("Tumo Products").find().toArray();
            res.render("../public/form.ejs", {products});
        } catch (error) {
            console.log(error)
        } finally {
            mongoose.connection.close();
            console.log("Closed Connection");
        }
    })
});

app.get("/:id", (req, res) => {
    const id = req.params.id

    mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Connection error:'));

    db.once("open", async () => {
        try {
            console.log("Connected to MongoDB getting Single ID product!");
            console.log(id, "ID Single")
            // const product = await mongoose.connection.db.collection("Tumo Products").findOne()
            // console.log(product)
            res.render("../public/update.ejs");
        } catch (error) {
            console.log(error)
        } finally {
            mongoose.connection.close();
            console.log("Closed Connection");
        }
    })




});

app.post('/add-user', async (req, res) => {
    const { name, price, image, uuid, description } = req.body;
    console.log('Data:', name , price, image, uuid, description);

    mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Connection error:'));


    db.once("open", async () => {
        try {
            console.log("Connected to MongoDB!");
            const product = await mongoose.connection.db.collection("Tumo Products").insertOne({ name, price, image, uuid, description });
        } catch (error) {
            console.log(error)
        } finally {
            mongoose.connection.close();
            console.log("Closed Connection");
        }
    })
});

app.listen(3000, () => console.log("Example is running on port 3000"));
