const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended :false}));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    console.log("GET home");
})

app.get("/CMs/:initials", (req, res) => {
    console.log(req);
    data = {
        text: "This is a string that comes from the server",
        initials: `The initials are: ${req.params.initials}`
    }
    res.status(200).send(JSON.stringify(data));

})

app.listen(3030, () => console.log("Server active"));