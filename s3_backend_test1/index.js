const cors = require("cors");
const express = require("express");
const fs = require("node:fs");
const path = require("node:path");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());


const routesDir = path.join(__dirname, "routes");
const routeFiles = fs.readdirSync(routesDir);

routeFiles.forEach((fileName) => {
    if (fileName.endsWith(".js")) {
        const filePath = path.join(routesDir, fileName);
        app.use("/", require(filePath));
    }
});

app.listen(4000, (err) => {
    if (err) { console.log(err); }
    else { console.log("server running on port 4000"); }
})