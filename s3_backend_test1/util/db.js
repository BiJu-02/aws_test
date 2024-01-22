const db = require("./connectDb");

const postImg = async (data) => {
    const dbRes = await db.collection("dummy").updateOne(
        { key: data },
        { $set: { key: data } },
        { upsert: true }
    );
    if (dbRes.acknowledged) {
        return true;
    }
    return false;
};

const getImg = async () => {
    const dbRes = await db.collection("dummy").find().toArray();
    return dbRes;
};

const delImg = async (data) => {
    console.log("data", data);
    const dbRes = await db.collection("dummy").deleteOne({ key: data });
    console.log(dbRes);
    if (dbRes.acknowledged && dbRes.deletedCount > 0) {
        return true;
    }
    return false;
};

module.exports = {
    postImg,
    getImg,
    delImg
};