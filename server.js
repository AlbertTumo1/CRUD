const express = require("express");
const path = require("path");

const bodyParser = require('body-parser');
const app = express();

// Test Config

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname,'./public/form.html'));
});

app.post('/add-name', (req, res) => {
    const { name, age } = req.body;
    console.log('Data:', name , age );
    res.redirect('/');
 });

app.listen(3000, () => console.log("Example is running on port 3000"));

