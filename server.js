const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require("path");
const { ObjectId } = require("mongoose").Types;

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

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

app.get("/update/:id", (req, res) => {
    const id = req.params.id;

    mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Connection error:'));

    db.once("open", async () => {
        try {
            console.log("Connected to MongoDB getting Single ID product!");
            const product = await mongoose.connection.db.collection("Tumo Products").findOne({ _id: new ObjectId(id) });
            console.log(product)
            res.render("../public/update.ejs", {product});
        } catch (error) {
            console.log(error)
        } finally {
            mongoose.connection.close();
            console.log("Closed Connection");
        }
    })
});

app.get("/delete/:id", (req, res) => {
    const id = req.params.id;

    mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Connection error:'));

    db.once("open", async () => {
        try {
            console.log("Connected to MongoDB getting Single ID product!");
            const product = await mongoose.connection.db.collection("Tumo Products").deleteOne({ _id: new ObjectId(id) });
            res.redirect("/");
        } catch (error) {
            console.log(error)
        } finally {
            mongoose.connection.close();
            console.log("Closed Connection");
        }
    })
})

app.post("/update-product/", (req, res) => {
    const { id, name, price, image, uuid, description } = req.body;
    console.log(name, price, image, uuid, description, id);

    mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Connection error:'));

    db.once("open", async () => {
        try {
            console.log("Connected to MongoDB getting Single ID product!");
            await mongoose.connection.db.collection("Tumo Products").updateOne({ _id: new ObjectId(id) }, {  $set: { name: name, price: price, image: image, uuid: uuid, description: description } } );
            res.redirect("/");
        } catch (error) {
            console.log(error)
        } finally {
            mongoose.connection.close();
            console.log("Closed Connection");
        }
    })
})

app.post('/add-product', async (req, res) => {
    const { name, price, image, uuid, description } = req.body;
    console.log('Data:', name , price, image, uuid, description);

    mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'Connection error:'));

    db.once("open", async () => {
        try {
            console.log("Connected to MongoDB!");
            await mongoose.connection.db.collection("Tumo Products").insertOne({ name, price, image, uuid, description });
            res.redirect(req.originalUrl)
        } catch (error) {
            console.log(error)
        } finally {
            mongoose.connection.close();
            console.log("Closed Connection");
        }
    })
});

app.listen(3000, () => console.log("Example is running on port 3000"));
