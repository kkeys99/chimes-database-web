const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended :false}));
app.use(bodyParser.json());

const CMNames = {
    CLL: "Chenchen Lilia Lu '23",
    CMC: "Cameron M. Carr '23",
    EMW: "Elisabeth M. Wang '23",
    VZ: "Vivian Zhao '23",
    CEL: "Carey E. Lau '22",
    JKM: "Jenna K. Mertz '23",
    SJG: "Sebastian J. Guo '23",
    AK : "Alex Koenigsberger '21",
    LYL: "Linda Y. Li '22",
    KMDS: "Kayla M. D. Shames '22",
    GLR: "Gretchen L. Ryan '??",
    JLCLM: "Jennifer L. C. Lory-Moran '9?",
    KGJ: "Keith G. Jenkins '9?"
}

app.get("/", (req, res) => {
    console.log("GET home");
})

app.get("/CMs/:initials", (req, res) => {
    data = {
        text: CMNames[req.params.initials]
    }
    res.status(200).send(JSON.stringify(data));

})

app.listen(3030, () => console.log("Server active"));