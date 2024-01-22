const { MongoClient } = require("mongodb");

module.exports = new MongoClient(process.env.MONGO_URI).db("s3test1db");