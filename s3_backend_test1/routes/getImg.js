const router = require("express").Router();
const { getImg } = require("../util/db");
const { getImgURL } = require("../util/s3");

router.get("/img", async (req, res) => {
    const imgList = await getImg();
    const urlList = await Promise.all(imgList.map(async (x) => { return await getImgURL(x.key); }));
    res.send({message: "hello", data: urlList, nameList: imgList});
});

module.exports = router;